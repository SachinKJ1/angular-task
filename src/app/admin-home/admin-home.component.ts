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
  limitPerPage = 10;
  constructor(
    private authService: AuthService,
    private localService: LocalService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(query: string = '', page: string = '') {
    this.authService.onGetAllUsers(query, page).subscribe({
      next: (res: any) => {
        this.users = res.users;
        this.maxPage = Math.floor(res.count / this.limitPerPage) + 1;
        // console.log(res);
        const countArr = Array.from({ length: res.count }, (v, i) => i);
        this.pageArr = [];
        countArr.forEach((val: any, index: number) => {
          if (index === 0) this.pageArr.push(0);
          if ((index + 1) % this.limitPerPage === 0) {
            this.pageArr.push((index + 1) / this.limitPerPage);
          }
        });
        if (res.count % this.limitPerPage === 0) this.pageArr.pop();
        // console.log(countArr);
        // console.log(this.pageArr);
      },
      error: (err: any) => {
        console.error(err);
        this.localService.toNotify('red', 'Something went wrong');
      },
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
    this.getAllUsers(query);
    this.localService.toStopSpin();
  }

  paginate(event: any) {
    const { page } = event.target.dataset;
    let query = `?username[$regex]=${this.searchQuery}&username[$options]=i`;
    // console.log(this.curPage);
    this.curPage = Number(page);
    // console.log(this.curPage);

    this.getAllUsers(query, `&page=${page}`);
  }
}
