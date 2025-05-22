import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add-feedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  addform: FormGroup;
  feedback: Feedback = {
    FeedbackId: 0,
    UserId: 0,
    Comments: '',
    DateProvided: new Date(),
  };

  constructor(
    private feedbackService: FeedbackService,
    private builder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.addform = this.builder.group({
      feedbackText: this.builder.control("", Validators.required)
    });
  }

  addFeedback() {
    if (this.addform.valid) {
      this.feedback.UserId = +localStorage.getItem("userId");
      this.feedback.Comments = this.addform.value.feedbackText;
      this.feedback.DateProvided = new Date();
      console.log('Feedback to be sent:', this.feedback); // Log the feedback object

      this.feedbackService.sendFeedback(this.feedback).subscribe((res) => {
        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: 'Feedback added successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.addform.reset(); // Reset the form
          this.router.navigate(['/userviewfeedback']);
        });
      }, error => {
        console.error('Error adding feedback:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error adding the feedback.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill out the feedback text.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  get feedbackText() {
    return this.addform.get('feedbackText');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
