
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../modal-base';
import { MapComponent } from '../../components/map/map';

@Component({
    templateUrl: './map-modal.html',
    styleUrls: ['./map-modal.scss']
})
export class MapModalComponent extends ModalComponent implements AfterViewInit {

    @ViewChild('ref', { read: ViewContainerRef }) ref!: ViewContainerRef;
    constructor(private cd: ChangeDetectorRef) {
        super()
    }
    @ViewChild('close') closeBtn!: ElementRef;

    ngAfterViewInit(): void {
        this.ref.createComponent(MapComponent);
        this.cd.detectChanges();
    }


    destroyModal() {
        console.log('123')
        this.closeBtn.nativeElement.style.display = 'none';
    }


}