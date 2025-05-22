import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  viewfeedback: Feedback[] = [];
  feedbackId: number;
  userId: number;
  delPopup: boolean = false;
  feedbackToDel: Feedback | null = null;

  constructor(
    private service: FeedbackService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    console.log('User ID:', this.userId); // Log the userId to check its value
    if (isNaN(this.userId)) {
      console.error('Invalid user ID:', this.userId);
      return;
    }
    this.getFeedbacksByUserId(this.userId);
  }

  public getFeedbacks(): void {
    this.service.getFeedbacks().subscribe((data: Feedback[]) => {
      this.viewfeedback = data;
    });
  }

  public getFeedbacksByUserId(userId: number): void {
    this.service.getAllFeedbacksByUserId(userId).subscribe((data: Feedback[]) => {
      this.viewfeedback = data;
    });
  }

  public deleteFeedback(): void {
    if (this.feedbackToDel) {
      this.service.deleteFeedback(this.feedbackToDel.FeedbackId).subscribe(() => {
        this.getFeedbacksByUserId(this.userId);
        this.delPopup = false;
      });
    }
  }

  public confirmDelete(id: number): void {
    this.feedbackId = id;
    this.delPopup = true;
    this.feedbackToDel = this.viewfeedback.find(f => f.FeedbackId === id) || null;
  }

  public closeDel(): void {
    this.delPopup = false;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  // Helper function to generate star rating HTML
  public getStarRating(rating: number): string {
    const maxRating = 5;
    let stars = '';
    for (let i = 0; i < maxRating; i++) {
      stars += i < rating ? '★' : '☆'; // Filled and empty stars
    }
    return stars;
  }
}
