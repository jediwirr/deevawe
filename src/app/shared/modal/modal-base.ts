import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	templateUrl: './modal.component.html',
})
export class ModalComponent {
	@Output() closeModal = new EventEmitter();

	@Input() title!: string;

	@Input() body!: any;
}
