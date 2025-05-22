import { Component, OnInit } from '@angular/core';
import { SavingsPlan } from '../../models/savingsplan.model';
import { SavingsplanService } from '../../services/savingsplan.service';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userviewsavingsplan',
  templateUrl: './userviewsavingsplan.component.html',
  styleUrls: ['./userviewsavingsplan.component.css']
})
export class UserviewsavingsplanComponent implements OnInit {
  name: string = '';
  savingsPlans: SavingsPlan[] = [];
  filteredSavingsPlans: SavingsPlan[] = [];
  paginatedSavingsPlans: SavingsPlan[] = [];
  isApplied: boolean[] = []; 
  sortColumn: string = '';
  sortDirection: string = 'asc'; // 'asc' for ascending, 'desc' for descending
  riskLevel: string = 'All'; // Default value for dropdown
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private service: SavingsplanService,
    private planappservice: PlanapplicationformService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllSavingsPlans();
  }

  public getAllSavingsPlans() {
    this.service.getAllSavingsPlans().subscribe((data) => {
      console.log("Savings Plans:", data); // Debugging line
      this.savingsPlans = data;
      this.filteredSavingsPlans = [...data];
      this.updatePagination();
      this.checkApplications();
    });
  }

  public filterByName(name: string) {
    if (name === "") {
      this.filteredSavingsPlans = [...this.savingsPlans];
    } else {
      const searchTerm = name.toLowerCase();
      this.filteredSavingsPlans = this.savingsPlans.filter(p =>
        p.Name.toLowerCase().includes(searchTerm) ||
        p.GoalAmount.toString().toLowerCase().includes(searchTerm) ||
        p.TimeFrame.toString().toLowerCase().includes(searchTerm) ||
        p.RiskLevel.toLowerCase().includes(searchTerm) ||
        p.Description.toLowerCase().includes(searchTerm) ||
        p.Status.toLowerCase().includes(searchTerm)
      );
      console.log("Filtered Results:", this.filteredSavingsPlans); // Debugging line
    }
    this.currentPage = 1; // Reset to first page when filtering
    this.updatePagination();
    this.checkApplications();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public checkApplications() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.isApplied = [];
      this.savingsPlans.forEach((plan, index) => {
        this.planappservice.getPlanApplicationsBySavingsPlanIdAndUserId(plan.SavingsPlanId, +userId).subscribe((applications) => {
          this.isApplied[index] = applications.length > 0;
        });
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }

  sortTable(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredSavingsPlans.sort((a, b) => {
      if (a[column] < b[column]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (a[column] > b[column]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    
    this.updatePagination(); // Update pagination after sorting
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'ascending' : 'descending';
    }
    return '';
  }

  public filterByRiskLevel() {
    if (this.riskLevel === 'All') {
      this.filteredSavingsPlans = [...this.savingsPlans];
    } else {
      this.filteredSavingsPlans = this.savingsPlans.filter(p => p.RiskLevel === this.riskLevel);
    }
    console.log("Filtered Plans by Risk Level:", this.filteredSavingsPlans); // Debugging line
    this.currentPage = 1; // Reset to first page when filtering
    this.updatePagination();
    this.checkApplications();
  }

  // Pagination methods
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredSavingsPlans.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updateCurrentPageData();
  }

  updateCurrentPageData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedSavingsPlans = this.filteredSavingsPlans.slice(start, end);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCurrentPageData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCurrentPageData();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPageData();
    }
  }

  onItemsPerPageChange() {
    this.currentPage = 1; // Reset to first page when changing items per page
    this.updatePagination();
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    const end = this.startIndex + this.itemsPerPage;
    return end > this.filteredSavingsPlans.length ? this.filteredSavingsPlans.length : end;
  }
}