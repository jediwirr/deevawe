import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from '../../modal/modal-base';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
})
export class ToastComponent extends ModalComponent implements OnInit {
  @Input() inputData: {
    text: string;
  } = { text: '' };

  public text = '';

  public ngOnInit(): void {
    const { text } = this.inputData;
    this.text = text;
  }
}
