import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  public apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  sendFeedback(feedback: Feedback): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Feedback`, feedback);
  }

  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/Feedback/user/${userId}`);
  }

  deleteFeedback(feedbackId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/Feedback/${feedbackId}`);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/Feedback`);
  }

  getUserByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/Feedback/user/${userId}`);
  }
}
