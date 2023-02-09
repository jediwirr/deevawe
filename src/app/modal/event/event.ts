import { LocalStorageService } from './../../core/services/localStorage.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalComponent } from '../modal-base';

@Component({
  templateUrl: './event.component.html',
  styleUrls: ['./event.style.scss'],
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

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

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

  public setOptionSelect(selectValue: string | undefined): void {
    // this.eventForm.controls.
  }

  public setDate(): void {}

  public async submitEvent(): Promise<void> {
    if (!this.eventForm.valid) {
      return;
    }
    const { title, description, geolocation } = this.eventForm.controls;
    this.closeModal.emit({
      user_id: await this.localStorageService.getUserId(),
      title,
      description,
      type: 1,
      status: 2,
      longitude: geolocation.value.lon,
      latitude: geolocation.value.lat,
    })
  }

  public destroyModal(): void {
    this.closeModal.emit();
  }
}
