import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.style.scss'],
})
export class NavigationComponent implements OnDestroy {
  public readonly listNavigation = [
    { name: 'Главная', routingName: '/home' },
    { name: 'Профиль', routingName: '/profile' },
    { name: 'Подписки', routingName: '/subscribes' },
    { name: 'Люди', routingName: '/people' },
  ];

  private subscription: Observable<string>;

  private subscriptionUrl!: Subscription;

  public nameActivePage!: string;

  constructor(protected router: Router) {
    this.subscription = new Observable((subscriber) => {
      subscriber.next(this.router.url);
    });
    this.subscriptionUrl = this.subscription.subscribe((url) => {
      this.setTitleActiveUrl(url);
    });
  }

  private setTitleActiveUrl(url: string) {
    this.listNavigation.forEach((item) => {
      if (item.routingName === url) {
        this.nameActivePage = item.name;
        return undefined;
      }
      return undefined;
    });
  }

  public ngOnDestroy(): void {
    this.subscriptionUrl.unsubscribe();
  }
}
