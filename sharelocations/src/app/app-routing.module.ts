import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './user/list-user.component';
import { CreateUserComponent } from './user/create-user.component';
import { LoginUserComponent } from './user/login-user.component';
import { ShareLocationsComponent } from './user/share-locations.component';

const routes: Routes = [
  {path: '', redirectTo: '/userlists', pathMatch: 'full'},
  {path: 'userlists', component: ListUserComponent},
  {path: 'locations', component: ShareLocationsComponent},
  {path: 'locations/:userid', component: ShareLocationsComponent},
  {path: 'signup', component: CreateUserComponent},
  {path: 'login', component: LoginUserComponent},
  {path: '**', redirectTo: '/userlists', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
