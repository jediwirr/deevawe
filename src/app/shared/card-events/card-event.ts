import { Component, Input } from "@angular/core";
import { Occasion } from "src/app/core/interfaces/events";

@Component({
    selector: 'app-card-event',
    templateUrl: './card-events.component.html'
})

export class CardEventComponent {
    @Input() event!: Occasion;
}