import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  selectedUser: any = null;
  isProfileModalOpen: boolean = false;

  constructor(private feedbackService: FeedbackService, private router: Router, private route: ActivatedRoute, private authService:AuthService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  // Load all feedbacks
  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((data: any) => {
      this.feedbacks = data;
      if (!this.feedbacks.length) {
        Swal.fire('Oops!', 'No records found.', 'info');
      }
    });
  }

  // Show user profile in a modal
  showUserProfile(user: User): void {
    Swal.fire({
      title: 'User Information',
      html: `<p><strong>Name:</strong> ${user.Username}</p>
      <p><strong>Email:</strong> ${user.Email}</p>
      <p><strong>Mobile Number:</strong> ${user.MobileNumber}</p>`,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }

  openProfileModal(user: any): void {
    this.selectedUser = user;
    this.isProfileModalOpen = true;
  }

  closeProfileModal(): void {
    this.isProfileModalOpen = false;
    this.selectedUser = null;
  }
  
  isLoggedIn()
  {
    return this.authService.isLoggedIn();
  }
}
