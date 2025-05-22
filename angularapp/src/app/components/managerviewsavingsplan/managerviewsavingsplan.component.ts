import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SavingsPlan } from 'src/app/models/savingsplan.model';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { AuthGuard } from '../authguard/auth.guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-managerviewsavingsplan',
  templateUrl: './managerviewsavingsplan.component.html',
  styleUrls: ['./managerviewsavingsplan.component.css']
})
export class ManagerviewsavingsplanComponent implements OnInit {
  savingsPlanId: number;
  savingsPlan: SavingsPlan = {
    Name: '',
    GoalAmount: 0,
    TimeFrame: 0,
    RiskLevel: 'Low',
    Description: '',
    Status: ''
  };
  savingsPlans: SavingsPlan[] = [];
  showMessage: Boolean = false;


  constructor(private service: SavingsplanService, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.savingsPlanId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.service.getSavingsPlanById(this.savingsPlanId).subscribe((data) => {
      this.savingsPlan = data;
      console.log(data);

    });
    this.getAllSavingsPlans();
  }

  public getAllSavingsPlans() {
    this.service.getAllSavingsPlans().subscribe((data) => { this.savingsPlans = data })
  }
  public updateSavingsPlan(savingsPlanID) {
    this.router.navigate([`/managereditsavingsplan/${savingsPlanID}`]);
  }

  public deleteSavingsPlan(id: number) {
    this.service.deleteSavingsPlan(id).subscribe(() => {
      this.getAllSavingsPlans();
    })
  }

  confirmDelete(savingsPlan: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSavingsPlan(savingsPlan.SavingsPlanId);
        Swal.fire(
          'Deleted!',
          'Your savings plan has been deleted.',
          'success'
        );
      }
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
