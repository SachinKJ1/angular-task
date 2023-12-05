import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  users!: any;
  constructor(
    private authService: AuthService,
    private localService: LocalService
  ) {}

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.authService.onGetAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.users;
        console.log(res.users);
      },
      error: (err: any) => {},
    });
  }


  onDeleteUser(id: string) {
    this.authService.onDeleteUser(id).subscribe({
      next: (res: any) => {
        this.localService.toNotify('green', 'User deleted successfully');
        this.getAllUsers()
      },
      error: (err: any) => {
        this.localService.toNotify('red', 'Something went wrong');
      },
    });
  }
}
