
import {
	ComponentRef,
	EventEmitter,
	Injectable,
	NgZone,
	Type,
	ViewContainerRef,
} from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal-base';

@Injectable({
	providedIn: 'root',
})
export class ModalService {

	protected componentRef!: ComponentRef<any>;

	constructor(private zone: NgZone) { }

	public openModal(
		entryComponent: ViewContainerRef,
		options?: { title?: string },
		modalComponent?: Type<any>,
	): EventEmitter<unknown> {
		const closeModalResult = new EventEmitter();
		entryComponent.clear();
		this.componentRef = entryComponent.createComponent(modalComponent ? modalComponent : ModalComponent);
		/* if (options?.title) {
			this.componentRef.instance.title = options.title;
		} */
		this.componentRef.instance.closeModal.subscribe((res: any) => {
			closeModalResult.emit(res);
		});
		return closeModalResult;

	}

	public destroyModal(): void {
		this.componentRef.destroy();
	}
}
