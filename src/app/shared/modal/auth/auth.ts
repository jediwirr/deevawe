import { Router } from '@angular/router';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../modal-base';

@Component({
  selector: 'app-auth',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.style.scss'],
})
export class AuthModalComponent extends ModalComponent {

  public isSignUp = false;

  constructor(
    protected router: Router
  ) {
    super();
  }

  public setFlagSignUp(): void {
    this.isSignUp = !this.isSignUp;
  }
}
