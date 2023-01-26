import { Component } from "@angular/core";
import { ModalComponent } from "../modal-base";

@Component({
    templateUrl: './event.component.html'
})

export class EventFormComponent extends ModalComponent {
    public readonly listTypeEvent = [
        {
            type: 'drink',
            name: 'Выпить'
        }
    ];

    public isShowMap = false;

    public showOrHideMap(): void {
        this.isShowMap = !this.isShowMap;
    }
}