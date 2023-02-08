import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  private subscriptionUrl!: Subscription;

  public nameActivePage!: string;

  constructor(
    protected router: Router,
    private modalService: ModalService
    ) {}

  public openFormEvent(): void {
    this.modalService.injectComponent(this.modalFormEvent, EventFormComponent);
    this.modalService.closedModal.subscribe(() => {
    });
  }

  public ngOnDestroy(): void {
    this.subscriptionUrl.unsubscribe();
  }
}
