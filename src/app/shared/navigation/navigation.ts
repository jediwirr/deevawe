import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { EventFormComponent } from '../../modal/event/event';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.style.scss'],
})
export class NavigationComponent {
  @ViewChild('modalFormEvent', { read: ViewContainerRef })
  modalFormEvent!: ViewContainerRef;

  public readonly listNavigation = [
    { name: 'Главная', routingName: '/home' },
    { name: 'Профиль', routingName: '/profile' },
    { name: 'Подписки', routingName: '/subscribes' },
    { name: 'Люди', routingName: '/people' },
  ];

  public nameActivePage!: string;

  constructor(protected router: Router, private modalService: ModalService) {}

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
    if (this.modalFormEvent.length) {
      return;
    }
    this.modalService.injectComponent(this.modalFormEvent, EventFormComponent);
    this.modalService.closedModal.subscribe(() => {
      this.modalService.destroyModal();
    });
  }
}
