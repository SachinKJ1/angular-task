import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private localService: LocalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{5,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
    });
  }

  onLogin() {
    if (!this.loginForm.valid)
      return this.localService.toNotify(
        'red',
        'Please fill the necessary fields in correct format'
      );
    this.localService.toSpin();

    this.auth.onLogin(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['/home']);
        this.localService.toStopSpin();
        this.localService.toNotify('green', 'Successfully Logged In');
      },
      error: (err: any) => {
        console.log(err);
        this.localService.toStopSpin();

        if (err.status == 401)
          return this.localService.toNotify('red', 'Invalid email or password');
        
        this.localService.toNotify('red', 'Something went wrong');
      },
    });
  }
}
