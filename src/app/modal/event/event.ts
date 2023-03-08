import { EventsService } from './../../core/services/events/events.service';
import { TimeZones } from './../../core/interfaces/time-zones.d';
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
    description: new FormControl<string>('', { nonNullable: true }),
    geolocation: new FormControl<{
      lat: number;
      lon: number;
    }>(
      {
        lat: 0,
        lon: 0,
      },
      { nonNullable: true }
    ),
    startDate: new FormControl<string>('', { nonNullable: true }),
    endDate: new FormControl<string>('', { nonNullable: true }),
  });

  constructor(
    private localStorageService: LocalStorageService,
    private eventsService: EventsService
  ) {
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
    // if (!this.eventForm.valid) {
    //   return;
    // }
    const userId = await this.localStorageService.getUserId();
    const { title, description, geolocation } = this.eventForm.controls;
    this.eventsService
      .addOrUpdateEvent(
        {
          user_id: userId,
          title: title.value,
          description: description.value,
          type: 1,
          status: 2,
          longitude: geolocation.value.lon,
          latitude: geolocation.value.lat,
          time_start: 1664542280,
          time_end: 1664542282,
          time_zone: 'Europe/Astrakhan',
        },
        'put'
      )
      .subscribe(() => {
        this.eventsService.searchById({
          limit: 1,
          sort: 'id',
          user_id: userId,
          val: userId,
        });
      });
    this.destroyModal();
  }

  public destroyModal(): void {
    this.closeModal.emit();
  }
}
