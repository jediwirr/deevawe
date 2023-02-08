import { EventsService } from './../core/services/events/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../core/interfaces/users';
import { LocalStorageService } from '../core/services/localStorage.service';
import { UsersApiService } from '../core/services/users-api.service';
import { Occasions } from '../core/interfaces/events';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfilePageComponent implements OnInit {
  public user!: User;

  public userId!: number;

  public events: Occasions = {count: 0, events: []};

  constructor(
    private userServiceApi: UsersApiService,
    private eventService: EventsService,
    private localStorage: LocalStorageService,
    protected routed: ActivatedRoute
  ) {
    this.routed.queryParams.subscribe((data: { id?: string}) => {
      if (data.id) {
        this.getUserInfo(parseInt(data.id, 10));
        return;
      }
      this.getUserInfo();
    });
  }

  public ngOnInit(): void {
    this.getEventsByUser();
  }

  private async getEventsByUser(): Promise<void> {
   this.events = await this.eventService.searchEvents({user_id: this.userId, type: 2, limit: 1, radius: 2000, sort: 'id', value: this.userId, lon:0, lat: 0, minutes: 0})
  }

  private async getUserInfo(id?: number): Promise<void> {
    this.userId = id || await this.localStorage.getUserId();
    this.user = await this.userServiceApi.getUser(this.userId);
  }
}
