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
  searchQuery = '';
  curPage = 1;
  minPage = 1;
  maxPage!: number;
  pageArr: any = [];
  constructor(
    private authService: AuthService,
    private localService: LocalService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(query: string = '') {
    this.authService.onGetAllUsers(query).subscribe({
      next: (res: any) => {
        this.users = res.users;
        this.maxPage = Math.floor(res.count / 10) + 1;
        console.log(res);
        const countArr =  Array.from({ length: res.count }, (v, i) => i);
        countArr.forEach((val: any, index: number) => {
          if(index === 0) this.pageArr.push(0);
          if ((index + 1) % 2 === 0) {
            this.pageArr.push((index + 1) / 2);
          }
        });
        console.log(countArr);
        console.log(this.pageArr);
      },
      error: (err: any) => {},
    });
  }

  onDeleteUser(id: string) {
    let deleteUser = confirm('Are you sure you want to delete this user?');
    if (!deleteUser) return;

    this.authService.onDeleteUser(id).subscribe({
      next: (res: any) => {
        this.localService.toNotify('green', 'User deleted successfully');
        this.getAllUsers();
      },
      error: (err: any) => {
        this.localService.toNotify('red', 'Something went wrong');
      },
    });
  }

  onSearch() {
    if (!this.searchQuery) return;
    this.localService.toSpin();
    let query = `?username[$regex]=${this.searchQuery}&username[$options]=i`;
    console.log(this.searchQuery);
    this.getAllUsers(query);
    this.localService.toStopSpin();
  }
}
