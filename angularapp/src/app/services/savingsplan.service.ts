import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SavingsPlan } from '../models/savingsplan.model';
import { PlanApplication } from '../models/planapplication.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SavingsplanService {

  public apiUrl: string =environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken')
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllSavingsPlans(): Observable<SavingsPlan[]> {
    return this.http.get<SavingsPlan[]>(`${this.apiUrl}/api/savingsplans`, { headers: this.getHeaders() })
  }
  getAppliedPlans(userId: number): Observable<PlanApplication[]> {
    return this.http.get<PlanApplication[]>(`${this.apiUrl}/api/planapplications/user/${userId}`, { headers: this.getHeaders() })
  }
  deleteSavingsPlan(savingsPlanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/savingsplans/${savingsPlanId}`, { headers: this.getHeaders() })
  }
  getSavingsPlanById(Id: number): Observable<SavingsPlan> {
    return this.http.get<SavingsPlan>(`${this.apiUrl}/api/savingsplans/${Id}`, { headers: this.getHeaders() })
  }
  addSavingsPlan(requestObject: SavingsPlan): Observable<SavingsPlan> {
    return this.http.post<SavingsPlan>(`${this.apiUrl}/api/savingsplans`, requestObject, { headers: this.getHeaders() })
  }
  updateSavingsPlan(Id: number, requestObject: SavingsPlan): Observable<SavingsPlan> {
    return this.http.put<SavingsPlan>(`${this.apiUrl}/api/savingsplans/${Id}`, requestObject, { headers: this.getHeaders() })
  }
}
