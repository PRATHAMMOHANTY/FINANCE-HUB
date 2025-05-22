import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = environment.apiUrl;

  constructor(@Optional() private http: HttpClient) {
    if (!this.http) {
      console.warn('HttpClient is not provided!');
    }
  }

  register(user: User): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.apiUrl}/api/register`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(login: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, login)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || 'Server error');
  }

  // Token and user information management
  private setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  isRole(): void {
    const token = this.getItem('authToken');
    if (token) {
      const payload = this.decodeToken(token);
      if (payload) {
        this.setItem('userRole', payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
        this.setItem('userName', payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
        this.setItem('userId', payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
        this.setItem('emailAddress', payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
      }
    }
  }

  isLoggedIn(): boolean {
    const userRole = this.getItem('userRole');
    return userRole === 'RegionalManager' || userRole === 'Customer';
  }

  private hasRole(role: string): boolean {
    return this.getItem('userRole') === role;
  }

  isRegionalManager(): boolean {
    return this.hasRole('RegionalManager');
  }

  isCustomer(): boolean {
    return this.hasRole('Customer');
  }

  logout(): void {
    localStorage.clear();
  }
}
