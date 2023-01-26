import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EventFormComponent } from "../../modal/event/event";
import { ModalService } from "../../core/services/modal.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.style.scss'],
})
export class NavigationComponent implements OnDestroy {

  @ViewChild('modalFormEvent', {read: ViewContainerRef}) modalFormEvent!: ViewContainerRef;

  public readonly listNavigation = [
    { name: 'Главная', routingName: '/home' },
    { name: 'Профиль', routingName: '/profile' },
    { name: 'Подписки', routingName: '/subscribes' },
    { name: 'Люди', routingName: '/people' },
  ];

  private subscription: Observable<string>;

  private subscriptionUrl!: Subscription;

  public nameActivePage!: string;

  constructor(
    protected router: Router,
    private modalService: ModalService
    ) {
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

  public openFormEvent(): void {
    this.modalService.injectComponent(this.modalFormEvent, EventFormComponent);
    this.modalService.closedModal.subscribe(() => {
    });
  }

  public ngOnDestroy(): void {
    this.subscriptionUrl.unsubscribe();
  }
}
