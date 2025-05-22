import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagercreatesavingsplanComponent } from './components/managercreatesavingsplan/managercreatesavingsplan.component';
import { ManagerviewsavingsplanComponent } from './components/managerviewsavingsplan/managerviewsavingsplan.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ManagereditsavingsplanComponent } from './components/managereditsavingsplan/managereditsavingsplan.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { UserplanapplicationformComponent } from './components/userplanapplicationform/userplanapplicationform.component';
import { ManagerviewapplicationformComponent } from './components/managerviewapplicationform/managerviewapplicationform.component';
import { UserviewsavingsplanComponent } from './components/userviewsavingsplan/userviewsavingsplan.component';
import { UserappliedplansComponent } from './components/userappliedplans/userappliedplans.component';
import { ErrorComponent } from './components/error/error.component';

import { AuthGuard } from './components/authguard/auth.guard'; 

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addsavingplan', component: ManagercreatesavingsplanComponent, canActivate: [AuthGuard], data: { roles: ['RegionalManager'] } },
  { path: 'viewsavingplan', component: ManagerviewsavingsplanComponent, canActivate: [AuthGuard], data: { roles: ['RegionalManager'] } },
  { path: 'managereditsavingsplan/:id', component: ManagereditsavingsplanComponent, canActivate: [AuthGuard], data: { roles: ['RegionalManager'] } },
  { path: 'useraddfeedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard], data: { roles: ['Customer'] } },
  { path: 'userviewfeedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard], data: { roles: ['Customer'] } },
  { path: 'managerviewfeedbacks', component: ManagerviewfeedbackComponent, canActivate: [AuthGuard], data: { roles: ['RegionalManager'] } },
  { path: 'userviewsavingsplan', component: UserviewsavingsplanComponent, canActivate: [AuthGuard], data: { roles: ['Customer'] } },
  { path: 'userplanapplication/:id', component: UserplanapplicationformComponent, canActivate: [AuthGuard], data: { roles: ['Customer'] } },
  { path: 'managerviewapplications', component: ManagerviewapplicationformComponent, canActivate: [AuthGuard], data: { roles: ['RegionalManager'] } },
  { path: 'userappliedplans', component: UserappliedplansComponent, canActivate: [AuthGuard], data: { roles: ['Customer'] } },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' } // Fallback route for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
