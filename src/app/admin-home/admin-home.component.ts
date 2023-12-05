import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.onGetAllUsers().subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err: any) => {

      },
    });
  }
}
