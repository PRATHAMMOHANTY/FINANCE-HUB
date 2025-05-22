import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PlanApplication } from 'src/app/models/planapplication.model';
import { AuthService } from 'src/app/services/auth.service';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userappliedplans',
  templateUrl: './userappliedplans.component.html',
  styleUrls: ['./userappliedplans.component.css']
})
export class UserappliedplansComponent implements OnInit {
  planApplications: PlanApplication[] = [];
  userId: number;
  planApplicationId: number;
  isEditPopupOpen = false;
  isDeletePopupOpen = false;
  showPopup: boolean = false;
  selectedPlan: PlanApplication | null = null;
  planToDelete: PlanApplication | null = null;

  constructor(
    private planapplicationformService: PlanapplicationformService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.userId = +localStorage.getItem('userId');
    console.log("User ID:", this.userId);
    this.getAllPlanApplicationsByUserId(this.userId);
  }
  getAllPlanApplicationsByUserId(userId: number): void {
    this.planapplicationformService.getAppliedPlans(userId).subscribe((data: PlanApplication[]) => {
      this.planApplications = data;
      console.log("Fetched Plan Applications:", this.planApplications);
    }, (error) => {
      console.error("Error fetching plan applications:", error);
    });
  }

  openEditPopup(planApplicationId: number, previousPlan: PlanApplication): void {
    this.planApplicationId = planApplicationId;
    this.selectedPlan = { ...previousPlan };
    this.isEditPopupOpen = true;
  }

  closeEditPopup(): void {
    this.isEditPopupOpen = false;
    this.selectedPlan = null;
  }

  saveChanges(): void {
    if (this.selectedPlan) {
      this.planapplicationformService.updatePlanApplication(this.planApplicationId, this.selectedPlan).subscribe(
        () => {
          this.getAllPlanApplicationsByUserId(this.userId);
          Swal.fire('Success!', 'Your plan has been updated.', 'success');
        },
        (error) => {
          console.error("Error updating plan application:", error);
        }
      );
      this.closeEditPopup();
    }
  }

  confirmDelete(planApplicationId: number): void {
    this.planApplicationId = planApplicationId;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePlan();
      }
    });
  }

  deletePlan(): void {
    if (this.planApplicationId) {
      this.planapplicationformService.deletePlanApplication(this.planApplicationId).subscribe(
        () => {
          this.getAllPlanApplicationsByUserId(this.userId);
          Swal.fire('Deleted!', 'Your plan has been deleted.', 'success');
        },
        (error) => {
          console.error("Error deleting plan application:", error);
        }
      );
      this.closeDeletePopup();
    }
  }

  closeDeletePopup(): void {
    this.isDeletePopupOpen = false;
    this.planToDelete = null;
  }

  closePopups(): void {
    this.closeEditPopup();
    this.closeDeletePopup();
  }

  isPending(status:string):boolean{
    if(status=="Pending"){
      return true;
    }
    return false;
  }

  getDocumentUrl(base64String: string): SafeResourceUrl {
    const url = `data:application/pdf;base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  sortAmountAsc(): void {
    this.planApplications.sort((a, b) => a.AppliedAmount - b.AppliedAmount);
  }

  sortAmountDesc(): void {
    this.planApplications.sort((a, b) => b.AppliedAmount - a.AppliedAmount);
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}