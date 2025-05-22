import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanApplication } from 'src/app/models/planapplication.model';
import { SavingsPlan } from 'src/app/models/savingsplan.model';
import { AuthService } from 'src/app/services/auth.service';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userplanapplicationform',
  templateUrl: './userplanapplicationform.component.html',
  styleUrls: ['./userplanapplicationform.component.css']
})
export class UserplanapplicationformComponent implements OnInit {
  isAddMode: boolean;
  id: number = 0;
  planApplicationForm: PlanApplication = {
    AppliedAmount: 0,
    Status: 'pending',
    ApplicationDate: '',
    Remarks: '',
    ProofDocument: '',
    UserId: 0,
    SavingsPlanId: 0
  };
  savingsPlans: SavingsPlan[] = [];
  selectedFile: File | null = null;
  public apiUrl = environment.apiUrl;
  minDate: string;
  maxGoalAmount: number; // Ensure this is set
  amountError: string = '';
  fileError: string = '';

  constructor(
    private savingsPlanService: SavingsplanService,
    private planApplicationformService: PlanapplicationformService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    console.log('Loading data...');
    this.savingsPlanService.getAllSavingsPlans().subscribe((res) => {
      this.savingsPlans = res;
      console.log('Savings Plans:', this.savingsPlans);
    });

    this.id = this.activateRoute.snapshot.params['id'];
    console.log('ID from route:', this.id);

    this.isAddMode = !this.id;
    this.planApplicationForm.UserId = parseInt(localStorage.getItem("userId"));
    this.planApplicationForm.SavingsPlanId = this.id;
    this.savingsPlanService.getSavingsPlanById(this.id).subscribe(res => {
      this.maxGoalAmount = res.GoalAmount;
      console.log('Goal Amount:', this.maxGoalAmount);
    });

    this.setMinDate();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.toLowerCase();
      if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
        this.selectedFile = file;
        this.fileError = ''; // Clear any previous error
      } else {
        this.fileError = 'Only .jpg, .jpeg, and .png files are allowed.';
        this.selectedFile = null; // Clear the selected file
        (event.target as HTMLInputElement).value = ''; // Clear the input value
      }
    } else {
      this.fileError = 'Proof Document is required.';
    }
  }

  setMinDate(): void {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;
  }

  uploadImage(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('Token')
          })
        };

        this.http.post<{ ImageUrl: string }>(`${this.apiUrl}/api/PlanApplication/application/upload`, formData, httpOptions)
          .subscribe(
            response => resolve(response.ImageUrl),
            error => {
              console.error('Error uploading image:', error);
              this.fileError = 'Error uploading image.';
              reject(error);
            }
          );
      } else {
        this.fileError = 'No file selected.';
        resolve(null);
      }
    });
  }

  async addPlan() {
    try {
      const imageUrl = await this.uploadImage();
      this.planApplicationForm.ProofDocument = imageUrl;
      console.log(this.planApplicationForm);
      this.planApplicationformService.addPlanApplication(this.planApplicationForm).subscribe(
        (res) => {
          Swal.fire('Success!', 'Your application has been submitted.', 'success').then(() => {
            this.router.navigate(['/userappliedplans']);
          });
        },
        (error) => {
          Swal.fire('Error!', 'Applied amount exceeds the goal amount of the savings plan.');
          console.error("Error adding application", error);
        }
      );
    } catch (error) {
      Swal.fire('Error!', 'Error during image upload or application addition: ' + error.message, 'error');
      console.error("Error during image upload or application addition", error);
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  validateAmount(): void {
    if (this.planApplicationForm.AppliedAmount > this.maxGoalAmount) {
      this.amountError = 'Applied Amount must be less than or equal to the goal amount.';
      Swal.fire('Error', this.amountError, 'error');
    } else {
      this.amountError = '';
    }
  }

  onSubmit(form: NgForm): void {
    console.log('Form submitted:', form);
    this.validateAmount();
    if (form.invalid || this.amountError || this.fileError || !this.selectedFile) {
      if (!this.selectedFile) {
        this.fileError = 'Proof Document is required.';
      }
      if (this.fileError) {
        Swal.fire('Error!', this.fileError, 'error');
      }
      console.log('Form is invalid');
      return;
    }
    console.log('Form is valid');
    this.addPlan();
  }
}
