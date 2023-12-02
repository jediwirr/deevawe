import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild, ViewContainerRef } from "@angular/core";
import { ModalComponent } from "../modal-base";
import { ClockComponent } from "../../components/clock/clock";


@Component({
    templateUrl: './clock-modal.html',
    styleUrls: ['./clock.style.scss']
})

export class ClockModalComponent extends ModalComponent implements AfterViewInit {

    @ViewChild('ref', { read: ViewContainerRef }) ref!: ViewContainerRef;
    @ViewChild('close') closeBtn!: ElementRef;
    
    constructor(private cd: ChangeDetectorRef) {
        super()
    }

    ngAfterViewInit(): void {
        const component = this.ref.createComponent(ClockComponent);
        this.cd.detectChanges();
        component.instance.emitTime.subscribe({
            next:((val:string)=>{
                this.closeModal.emit(val);
            })
        })
    }
    destroyModal() {
        this.closeBtn.nativeElement.style.display = 'none';
    }
}