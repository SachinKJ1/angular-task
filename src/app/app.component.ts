import { Component, ChangeDetectorRef } from '@angular/core';
import { LocalService } from './services/local.service';
import { ChangeDetectionStrategy } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'userManager';

  isSpinnerActive = false;
  notify = false;
  formMsg = '';
  notifyColor = ''

  constructor(private localService: LocalService, private cdref: ChangeDetectorRef) {}

  ngOnInit() {
    this.localService.spinnig.subscribe({
      next: (res: boolean) => (this.isSpinnerActive = res),
    });

    this.localService.notifications.subscribe({
      next: (res: boolean) => (this.notify = res),
    });

    this.localService.notificationMsg.subscribe({
      next: (res: string) => (this.formMsg = res),
    });

    this.localService.notificationColor.subscribe({
      next: (res: string) => (this.notifyColor = res),
    });
  }

  ngAfterViewChecked(){
    // to detect changes after change detection in this parent component was finished
    this.cdref.detectChanges();
  }
}
