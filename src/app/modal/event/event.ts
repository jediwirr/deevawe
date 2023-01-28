import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalComponent } from '../modal-base';

@Component({
  templateUrl: './event.component.html',
})
export class EventFormComponent extends ModalComponent {
  public readonly listTypeEvent = [
    {
      type: 'drink',
      name: 'Выпить',
    },
  ];

  public isShowMap = false;

  public eventForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true }),
    description: new FormControl<string>('', {}),
    geolocation: new FormControl<{
      lat: number | null;
      lon: number | null;
    }>(
      {
        lat: null,
        lon: null,
      },
      { nonNullable: true }
    ),
    startDate: new FormControl<string>('', { nonNullable: true }),
    endDate: new FormControl<string>('', { nonNullable: true }),
  });

  public showOrHideMap(): void {
    this.isShowMap = !this.isShowMap;
  }

  public getCoordinates(coordinates: number[] | undefined): void {
    if (!coordinates) {
      this.showOrHideMap();
      return;
    }
    this.eventForm.controls.geolocation.setValue({
      lat: coordinates[0],
      lon: coordinates[1],
    });
  }
}
