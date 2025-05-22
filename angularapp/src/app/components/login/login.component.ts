import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = {
    Email: '',
    Password: ''
  }
  
  checkEmailandPassword: boolean = false;
  role: string = '';
  hidePassword: boolean = true;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  addlogin() {
    this.authService.login(this.login).subscribe((res)=>{
      console.log(res);
      localStorage.setItem("authToken", res.token);
      this.authService.isRole();
      this.role=localStorage.getItem('userRole').toLowerCase();
      console.log(this.role);
      this.router.navigate([`home`]);
      Swal.fire({
        title: 'Success!',
        text: 'Login Successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    },
    error=>{
      this.checkEmailandPassword=true;
      Swal.fire({
        title: 'Error!',
        text: 'Login Failed. Please try again.',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    })
  }
}
