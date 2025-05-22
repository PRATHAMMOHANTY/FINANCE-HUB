import { Component, OnInit } from '@angular/core';
import { SavingsPlan } from 'src/app/models/savingsplan.model';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-managercreatesavingsplan',
  templateUrl: './managercreatesavingsplan.component.html',
  styleUrls: ['./managercreatesavingsplan.component.css']
})
export class ManagercreatesavingsplanComponent implements OnInit {
  form: FormGroup;
  savingsPlan: SavingsPlan = {
    Name: '',
    GoalAmount: 0,
    TimeFrame: 0,
    RiskLevel: 'Low',
    Description: '',
    Status: ''
  };
  showMessage: Boolean = false;
 
  constructor(private service: SavingsplanService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }
 
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      goalAmount: ['', [Validators.required, Validators.min(1000), Validators.max(10000000)]],
      timeFrame: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      riskLevel: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
 
  public addSavingsPlan() {
    // Normalize the name for duplicate checking
    const originalName = this.form.value.name;
    const normalizedName = originalName.replace(/\s+/g, '').toLowerCase();
 
    // Check for duplicates
    this.service.getAllSavingsPlans().subscribe((existingPlans: SavingsPlan[]) => {
      const isDuplicate = existingPlans.some(plan => plan.Name.replace(/\s+/g, '').toLowerCase() === normalizedName);
 
      if (isDuplicate) {
        Swal.fire({
          title: 'Error!',
          text: 'A savings plan with the same name already exists.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        // Store the original name
        this.savingsPlan = { ...this.form.value, Name: originalName };
 
        this.service.addSavingsPlan(this.savingsPlan).subscribe(
          () => {
            Swal.fire({
              title: 'Success!',
              text: 'Savings plan successfully added.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/viewsavingplan']);
            });
            this.form.reset();
          },
          (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while adding the savings plan.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
 
  public get name() {
    return this.form.get('name');
  }
 
  public get goalAmount() {
    return this.form.get('goalAmount');
  }
 
  public get timeFrame() {
    return this.form.get('timeFrame');
  }
 
  public get riskLevel() {
    return this.form.get('riskLevel');
  }
 
  public get description() {
    return this.form.get('description');
  }
 
  public get status() {
    return this.form.get('status');
  }
 
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}