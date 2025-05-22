import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SavingsPlan } from 'src/app/models/savingsplan.model';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-managereditsavingsplan',
  templateUrl: './managereditsavingsplan.component.html',
  styleUrls: ['./managereditsavingsplan.component.css']
})
export class ManagereditsavingsplanComponent implements OnInit {

  savingsPlanId: number;
  savingsPlan: SavingsPlan = {
    Name: '',
    GoalAmount: 0,
    TimeFrame: 0,
    RiskLevel: 'Low',
    Description: '',
    Status: ''
  };
  showMessage: Boolean = false;

  constructor(
    private service: SavingsplanService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.savingsPlanId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"), 10);
    this.service.getSavingsPlanById(this.savingsPlanId).subscribe((data) => {
      this.savingsPlan = data;
      console.log("plan: " + this.savingsPlan.Status);
      if (this.savingsPlan.Status !== 'Active' && this.savingsPlan.Status !== 'Inactive') {
        this.savingsPlan.Status = 'Inactive';
      }
    });
  }

  public updateSavingsPlan(form: NgForm) {
    if (form.valid) {
      if (this.savingsPlan.GoalAmount < 1000 || this.savingsPlan.GoalAmount > 10000000) {
        Swal.fire({
          title: 'Error!',
          text: 'Goal Amount must be between 1,000 and 10,000,000.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (this.savingsPlan.TimeFrame < 1 || this.savingsPlan.TimeFrame > 50) {
        Swal.fire({
          title: 'Error!',
          text: 'Time Frame must be between 1 and 50 years.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      console.log('Form is valid');
      console.log('Sending data:', this.savingsPlan); // Log the data being sent
      this.service.updateSavingsPlan(this.savingsPlanId, this.savingsPlan).subscribe(
        (data) => {
          console.log('Update successful', data);
          Swal.fire({
            title: 'Success!',
            text: 'Savings plan successfully edited.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/viewsavingplan']);
          });
        },
        (error) => {
          console.error('Update failed', error);
          Swal.fire({
            title: 'Error!',
            text: 'Plan with the same name already exists!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  public onClick() {
    this.showMessage = false;
    this.router.navigate(['/managerviewsavingsplan']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
