/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ComponentRef,
  EventEmitter,
  Injectable,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ModalComponent } from 'src/app/modal/modal-base';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  protected componentRef!: ComponentRef<any>;

  @Output() closedModal = new EventEmitter();

  public openModal(
    entryComponent: ViewContainerRef,
    options: { title?: string }
  ): void {
    this.componentRef = entryComponent.createComponent(ModalComponent);
    if (options.title) {
      this.componentRef.instance.title = options.title;
    }
    this.componentRef.instance.closeModal.subscribe((res: any) => {
      this.closedModal.emit(res);
    });
  }

  public injectComponent<C>(
    entryComponent: ViewContainerRef,
    modalComponent: Type<C>,
    inputData?: Object
  ): void {
    this.componentRef = entryComponent.createComponent(modalComponent);
    if (inputData) {
      this.componentRef.instance.inputData = inputData;
    }
    this.componentRef.instance.closeModal.subscribe((res: any) => {
      this.closedModal.emit(res);
    });
  }

  public destroyModal(): void {
    this.componentRef.destroy();
  }
}
