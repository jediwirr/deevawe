import { Component, ViewChild, ViewContainerRef, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ModalComponent } from '../modal-base';
import { DatePickerComponent } from '../../components/date-picker/date-picker';


@Component({
    templateUrl: './date-picker.html',
    styleUrls: ['./date-picker.style.scss']
})

export class DatePickerModalComponent extends ModalComponent implements AfterViewInit {

    @ViewChild('ref', { read: ViewContainerRef }) ref!: ViewContainerRef;
    constructor(private cd: ChangeDetectorRef) {
        super()
    }
    @ViewChild('close') closeBtn!: ElementRef;

    ngAfterViewInit(): void {

        const component = this.ref.createComponent(DatePickerComponent);
        this.cd.detectChanges();
        component.instance.eventDate.subscribe({
            next:((val:string)=>{
                this.closeModal.emit(val);
            })
        })
    }


    destroyModal() {
        console.log('123')
        this.closeBtn.nativeElement.style.display = 'none';
    }

}