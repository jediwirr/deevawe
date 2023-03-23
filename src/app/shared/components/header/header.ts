import { Component, Type, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModalComponent } from "../../modal/auth/auth";
import { LocalStorageService } from '../../../core/services/localStorage.service';
import { EventFormComponent } from '../../modal/event/event';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.style.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalForm', { read: ViewContainerRef })
  modalForm!: ViewContainerRef;

  public listNavigation = [
    { name: 'Главная', routingName: '/home', visible: true },
    { name: 'Подписки', routingName: '/subscribes', visible: true },
    { name: 'Люди', routingName: '/humans', visible: true },
    { name: 'Профиль', routingName: '/profile', visible: true },
  ];

  public nameActivePage!: string;

  public isHideItemNavigation = false;

  public isAuth = false;

  constructor(
    protected router: Router,
    private modalService: ModalService,
    protected localStorageService: LocalStorageService
  ) {
  }

  public async ngOnInit(): Promise<void> {
   const result = await this.localStorageService.getItemLocalStorage('dataUser') as Object;
   this.isAuth = !!Object.keys(result).length;
  }

  public openFormEvent(): void {
    this.openModal(EventFormComponent);
  }

  public setVisibleParams(): void {
    this.listNavigation.forEach((item, index) => {
      if (item.routingName !== '/home') {
        this.listNavigation[index].visible = false;
      }
    });
  }

  private openModal<C>(component: Type<C>): void {
    if (this.modalForm.length) {
      return;
    }
    this.modalService.injectComponent(this.modalForm, component);
    this.modalService.closedModal.subscribe(() => {
      this.modalService.destroyModal();
    });
  }

  public openAuthModal(): void {
    this.openModal(AuthModalComponent);
  }
}
