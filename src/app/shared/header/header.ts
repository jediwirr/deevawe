import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/localStorage.service';
import { EventFormComponent } from '../modal/event/event';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.style.scss'],
})
export class HeaderComponent {
  @ViewChild('modalFormEvent', { read: ViewContainerRef })
  modalFormEvent!: ViewContainerRef;

  public listNavigation = [
    { name: 'Главная', routingName: '/home', visible: true },
    { name: 'Подписки', routingName: '/subscribes', visible: true },
    { name: 'Люди', routingName: '/humans', visible: true },
    { name: 'Профиль', routingName: '/profile', visible: true },
  ];

  public nameActivePage!: string;

  public isHideItemNavigation = false;

  constructor(
    protected router: Router,
    private modalService: ModalService,
    protected localStorageService: LocalStorageService
  ) {
    if (!this.localStorageService.getItemLocalStorage('dataUser')) {
      this.setVisibleParams();
    }
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

  public setVisibleParams(): void {
    this.listNavigation.forEach((item, index) => {
      if (item.routingName !== '/home') {
        this.listNavigation[index].visible = false;
      }
      if (item.name === 'Выйти') {
        this.listNavigation[index].name = 'Войти';
      }
    });
  }
}
