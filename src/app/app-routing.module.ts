import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AllClientsComponent } from './all-clients/all-clients.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { MyuserComponent } from './myuser/myuser.component';
import { OurUsersComponent } from './our-users/our-users.component';
import { ResultsComponent } from './results/results.component';
import { SearchReportComponent } from './search-report/search-report.component';
import { CheakUserService } from './service/cheak-user.service';
import { HalfadminService } from './service/halfadmin.service';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [CheakUserService] },
  { path: 'add-user', component: AddUserComponent, canActivate: [CheakUserService] },
  { path: 'user/:id', component: MyuserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EditUserComponent, canActivate: [CheakUserService] },
  { path: 'our-users', component: OurUsersComponent, canActivate: [CheakUserService] },
  { path: 'results/:id', component: ResultsComponent, canActivate: [CheakUserService] },
  { path: 'all-clients', component: AllClientsComponent, canActivate: [CheakUserService] },
  { path: 'search-report', component: SearchReportComponent, canActivate: [HalfadminService] },
  { path: '**', component: LoginComponent, canActivate: [CheakUserService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
