import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(@Optional() private authService: AuthService) 
  {
    if (!this.authService)
    {
      console.warn('AuthService is not provided!');
    }
  }

  images = [
    'assets/img1.jpg',
    'assets/img1.jpg',
    'assets/img2.jpg',
    'assets/img3.jpg',
  ];
  currentIndex = 0;
  intervalId: any;
  userRole: string | null = '';
 
  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    // this.startAutoSlide();
  }
 
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
 
  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 3000); // Change image every 2 seconds
  }
 
  getStarted() {
    alert("Welcome to FinanceHub! Let's get started.");
  }
 
  prev() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
  }
 
  next() {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
  }

  isRegionalManager()
  {
    return localStorage.getItem('userRole')==='RegionalManager';
  }

  isCustomer()
  {
    return localStorage.getItem('userRole')==='Customer';
  }
  
  isLoggedIn()
  {
    return this.authService.isLoggedIn();
  }
 
}
