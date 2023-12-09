import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import canActivateTeam from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: 'home',
    component: AdminHomeComponent,
    canActivate: [canActivateTeam],
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [canActivateTeam],
  },
  {
    path: 'update-user/:id',
    component: UpdateUserComponent,
    canActivate: [canActivateTeam],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
