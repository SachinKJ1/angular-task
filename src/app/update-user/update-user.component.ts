import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  updateUserForm!: FormGroup;
  user: any;
  isPasswordChange = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private localService: LocalService
  ) {}
  ngOnInit() {
    this.localService.toSpin();
    const { id } = this.route.snapshot.params;
    this.authService.onGetOneUser(id).subscribe({
      next: (res: any) => {
        this.user = res.data;
        console.log(this.user);

        this.updateUserForm.get('email')?.setValue(this.user.email);
        this.updateUserForm.get('username')?.setValue(this.user.username);
        this.updateUserForm.get('role')?.setValue(this.user.role);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.updateUserForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{5,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      curPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      newPasswordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      role: new FormControl(''),
    });
  }

  onUpdateNewUser() {
    const { id } = this.route.snapshot.params;
    this.authService.onUpdateUser(id, this.updateUserForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
