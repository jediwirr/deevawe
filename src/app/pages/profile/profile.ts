import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../core/services/events/events.service';
import { User } from '../../core/interfaces/users';
import { LocalStorageService } from '../../core/services/localStorage.service';
import { UsersApiService } from '../../core/services/users-api.service';
import { Occasions } from '../../core/interfaces/events';

@Component({
	templateUrl: './profile.component.html',
})
export class ProfilePageComponent implements OnInit {
	public user!: User;

	public userId!: number;

	public events: Occasions = { count: 0, events: [] };

	public readonly methodsSort = [
		{
			type: 'date',
			name: 'Дате публикации',
		},
	];

	constructor(
		private userServiceApi: UsersApiService,
		private eventService: EventsService,
		private localStorage: LocalStorageService,
		protected routed: ActivatedRoute
	) {
		this.routed.queryParams.subscribe((data: { id?: string }) => {
			if (data.id) {
				this.getUserInfo(parseInt(data.id, 10));
				return;
			}
			this.getUserInfo();
		});
		eventService.events.subscribe((occasion) => {
			this.events = occasion;
		});
	}

	public ngOnInit(): void {
		this.getEventsByUser();
	}

	private getEventsByUser(): void {
		this.eventService.searchById({
			user_id: this.userId,
			limit: 1,
			sort: 'id',
			val: this.userId,
		});
		// .subscribe((events) => {
		//   this.events = events;
		// });
	}

	private async getUserInfo(id?: number): Promise<void> {
		this.userId = id || (await this.localStorage.getUserId());
		this.userServiceApi.getUser(this.userId).subscribe((user) => {
			this.user = user;
		});
	}
}
