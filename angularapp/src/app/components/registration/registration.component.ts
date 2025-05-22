import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser: User = {
    Email: "",
    Password: "",
    Username: "",
    MobileNumber: "",
    UserRole: ""
  }

  err: string = "";
  showPassword: boolean = false;
  confirmPassword: string = "";
  checkUserExists: boolean = false;
  pdfTermsAccepted: boolean = false;
  regionalManagerCode = '0000';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  register() {
    if (!this.pdfTermsAccepted) {
      Swal.fire({
        title: 'Terms Required',
        text: 'Please accept the terms and conditions to proceed',
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false
      });
      return;
    }

    const userRole = this.newUser.UserRole;

    if (userRole === 'RegionalManager') {
      Swal.fire({
        title: 'Enter the code',
        input: 'text',
        inputLabel: 'Please enter the code for Regional Manager',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to enter a code!';
          } else if (value !== this.regionalManagerCode) {
            return 'Invalid code!';
          }
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
      }).then((result) => {
        if (result.isConfirmed) {
          this.completeRegistration();
        }
      });
    } else {
      this.completeRegistration();
    }
  }

  completeRegistration() {
    this.authService.register(this.newUser).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: 'Registration Successful!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        console.log(error);
        this.checkUserExists = true;
        this.err = error.error;
        Swal.fire({
          title: 'Error!',
          text: 'User already exists.Please use another email.',
          icon: 'error',
          timer: 3500,
          showConfirmButton: false
        });
      }
    );
  }
}