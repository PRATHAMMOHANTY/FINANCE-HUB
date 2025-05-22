import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  name: any = localStorage.getItem('userName');


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  



  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logout();
        this.router.navigate(['/login']);
        Swal.fire({
          title: 'Success!',
          text: 'Logged Out!!!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }
    });
  }
}


