import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setErrorMessage();
  }

  @Input() errorCode: number = 404;
  messageTitle: string = '';
  messageBody: string = '';


  setErrorMessage() {
    switch (this.errorCode) {
      case 404:
        this.messageTitle = 'Something Went Wrong';
        this.messageBody = "We're sorry, but an error occured. Please try again later.";
        break;
      case 500:
        this.messageTitle = 'Something Went Wrong';
        this.messageBody = "We're sorry, but an error occured. Please try again later.";
        break;
      default:
        this.messageTitle = 'Unknown Error';
        this.messageBody = 'An unexpected error occurred. Please try again later.';

    }
  }

  goBack() { window.history.back(); }
  
}