import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  loggedIn: boolean = false;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.checkTokenAvailability();

    this.auth.isLoggedIn.subscribe({
      next: (res: boolean) => {
        this.loggedIn = res;
      },
    });
  }
  ngOnChanges() {}

  signOut() {
    this.auth.signOutUser();
  }
}
