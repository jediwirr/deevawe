
import {
	ComponentRef,
	EventEmitter,
	Injectable,
	NgZone,
	Output,
	Type,
	ViewContainerRef,
} from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal-base';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	protected componentRef!: ComponentRef<any>;

	@Output() closedModal = new EventEmitter();

	constructor(private zone: NgZone) {}

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
		this.zone.run(() => {
			setTimeout(() => {
				this.componentRef =
					entryComponent.createComponent(modalComponent);
				if (inputData) {
					this.componentRef.instance.inputData = inputData;
				}
				this.componentRef.instance.closeModal.subscribe((res: any) => {
					this.closedModal.emit(res);
				});
			}, 0);
		});
	}

	public destroyModal(): void {
		this.componentRef.destroy();
	}
}
