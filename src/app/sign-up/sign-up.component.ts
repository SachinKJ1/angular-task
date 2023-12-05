import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private localService: LocalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signForm = new FormGroup({
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
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSignUp() {
    if (!this.signForm.valid)
      return this.localService.toNotify('red', 'Form is not valid');

    if (this.signForm.value.password !== this.signForm.value.passwordConfirm) {
      return this.localService.toNotify(
        'red',
        'Password and Password Confirmation do not match'
      );
    }
    this.localService.toSpin();

    // console.log(this.signForm.value);
    this.auth.onSignUp(this.signForm.value).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.router.navigate(['/home']);
        this.localService.toStopSpin();
        this.localService.toNotify('green', 'Successfully Signed In');
      },
      error: (err) => {
        // console.log(err);
        this.localService.toStopSpin();
        if(err.error.error.code == 11000) return this.localService.toNotify('red', 'Email Already Exists');
        this.localService.toNotify('red', 'Something went wrong');
      },
    });
  }
}
