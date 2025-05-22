import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanApplication } from '../models/planapplication.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanapplicationformService {

  public apiUrl:string=environment.apiUrl;

  plan: PlanApplication = {
    AppliedAmount: 0,
    Status: '',
    ApplicationDate: '',
    Remarks: '',
    ProofDocument: '',
    UserId: 0,
    SavingsPlanId: 0
  }

  constructor(private http: HttpClient) { }

  

  public addPlanApplication(plan: PlanApplication): Observable<PlanApplication> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
      })
    };
    return this.http.post<PlanApplication>(`${this.apiUrl}/api/PlanApplication/`, plan, httpOptions);
  }

  deletePlanApplication(planId: number): Observable<void> {
    console.log("delete plan in serv ", planId);
    return this.http.delete<void>(`${this.apiUrl}/api/PlanApplication/${planId}`);
  }

  getAppliedPlans(userId: number): Observable<PlanApplication[]> {
    return this.http.get<PlanApplication[]>(`${this.apiUrl}/api/PlanApplication/user/${userId}`);
  }

  getAllPlanApplications(): Observable<PlanApplication[]> {
    return this.http.get<PlanApplication[]>(`${this.apiUrl}/api/PlanApplication`);
  }

  updatePlanApplication(planId: number, updatedData: PlanApplication): Observable<PlanApplication> {
    return this.http.put<PlanApplication>(`${this.apiUrl}/api/PlanApplication/${planId}`, updatedData);
  }

  getPlanApplicationsBySavingsPlanIdAndUserId(savingsPlanId: number, userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/PlanApplication/savingsPlan/${savingsPlanId}/user/${userId}`);
  }


}
