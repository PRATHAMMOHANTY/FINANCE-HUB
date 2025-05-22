import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PlanApplication } from 'src/app/models/planapplication.model';
import { AuthService } from 'src/app/services/auth.service';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import { SavingsPlan } from 'src/app/models/savingsplan.model';

@Component({
  selector: 'app-managerviewapplicationform',
  templateUrl: './managerviewapplicationform.component.html',
  styleUrls: ['./managerviewapplicationform.component.css']
})
export class ManagerviewapplicationformComponent implements OnInit {
  constructor(private planApplicationformService: PlanapplicationformService, private sanitizer: DomSanitizer, private authService: AuthService) { }
  
  newStatus: string;
  planApplications: PlanApplication[] = [];
  filteredPlanApplications: PlanApplication[] = [];
  showPopup: boolean = false;
  searchPlanName: string = '';

  ngOnInit(): void {
    this.getAllPlanApplications();
  }
  
  getAllPlanApplications() {
    this.planApplicationformService.getAllPlanApplications().subscribe((data) => {
      this.planApplications = data.map(application => ({
        ...application,
        SavingsPlan: application.SavingsPlan || {} as SavingsPlan // Ensure SavingsPlan is defined
      }));
      this.filteredPlanApplications = this.planApplications;
      console.log("getall in comp ", this.planApplications);
    });
  }

  sortAmountAscending() {
    this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => a.AppliedAmount - b.AppliedAmount)];
  }

  sortAmountDescending() {
    this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => b.AppliedAmount - a.AppliedAmount)];
  }

  filterApplicationsByPlanName() {
    if (this.searchPlanName.trim()) {
      this.filteredPlanApplications = this.planApplications.filter(app => app.SavingsPlan?.Name?.toLowerCase().includes(this.searchPlanName.toLowerCase()));
    } else {
      this.filteredPlanApplications = [...this.planApplications];
    }
  }

  status: boolean;
  
  approve(planApplication: PlanApplication) {
    if (planApplication.Status === 'Pending') {
      planApplication.Status = 'Approved';
      console.log(planApplication.Status);
      this.planApplicationformService.updatePlanApplication(planApplication.PlanApplicationId, planApplication).subscribe((data: any) => {
        this.getAllPlanApplications();
        this.newStatus = planApplication.Status;
      });
    }
  }

  reject(planApplication: PlanApplication) {
    if (planApplication.Status === 'Pending') {
      planApplication.Status = 'Rejected';
      console.log(planApplication.Status);
      this.planApplicationformService.updatePlanApplication(planApplication.PlanApplicationId, planApplication).subscribe((data: any) => {
        this.getAllPlanApplications();
        this.newStatus = planApplication.Status;
      });
    }
  }

  getDocumentUrl(base64String: string): SafeResourceUrl {
    const url = `data:application/pdf;base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}