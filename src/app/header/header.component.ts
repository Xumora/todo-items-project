import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public langSubscription!: Subscription;
  public activeLang = this.translocoService.getActiveLang();

  constructor(private translocoService: TranslocoService) { }

  public ngOnInit(): void {
    this.langSubscription = this.translocoService.langChanges$
      .subscribe(lang => this.activeLang = lang);
  }

  public changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }

  public ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }
}
