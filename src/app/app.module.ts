import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NotificationComponent } from './notification/notification.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AttachTokenInterceptor } from './interceptor/attach-token.interceptor';
import { AuthGuard } from './guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    SpinnerComponent,
    AdminHomeComponent,
    NotificationComponent,
    CreateUserComponent,
    UpdateUserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttachTokenInterceptor,
      multi: true,
    },
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
