import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HandleErrorService } from './services/handle-error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public errorMessage: null | string = null;
  public errorSub!: Subscription;

  constructor(private handleErrorService: HandleErrorService) {}

  public ngOnInit(): void {
    this.errorSub = this.handleErrorService.errorMessage.subscribe(err => {
      this.errorMessage = err;
    });
  }

  public closeModal(): void {
    this.handleErrorService.errorMessage.next(null);
  }

  public ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
