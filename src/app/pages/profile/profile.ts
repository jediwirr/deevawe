import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from "../../core/services/websocket/websocket.service";
import { ImageService } from '../../core/services/images/image.service';
import { PersonalProfileManagerService } from '../../core/services/peoples/personal-profile-manager.service';
import { EventsService } from '../../core/services/events/events.service';
import { User } from '../../core/interfaces/users';
import { LocalStorageService } from '../../core/services/localStorage.service';
import { UsersApiService } from '../../core/services/users-api.service';
import { Occasions } from '../../core/interfaces/events';

@Component({
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.style.scss'],
})
export class ProfilePageComponent implements OnInit {
	public user!: User;

	public userId!: number;

	public originUserId?: number;

	public isRemoteProfile = false;

	public pendingSuggest = false;

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
		private personalProfileManagerService: PersonalProfileManagerService,
		private wsService: WebsocketService,
		protected imageService: ImageService,
		protected routed: ActivatedRoute
	) {
		eventService.events.subscribe((occasion) => {
			this.events = occasion;
		});
	}

	public async ngOnInit(): Promise<void> {
		this.userId = await this.localStorage.getUserId();
		this.routed.queryParams.subscribe((data: { id?: string }) => {
			this.originUserId = data.id ? parseInt(data.id, 10) : undefined;

			this.getUserInfo();
			this.getEventsByUser();
			this.isRemoteProfile = this.checkIsRemoteProfile();
		});
	}

	public checkIsRemoteProfile(): boolean {
		return !!this.originUserId && this.userId !== this.originUserId;
	}

	public addAsFriend(): void {
		this.userServiceApi
			.suggestAFriend(this.userId, this.originUserId!)
			.subscribe((result) => {
				if (result.code) {
					throw new Error("Не удалось отправить запрос в друзья");
				}
				this.pendingSuggest = true;
			});
	}

	public saveImage(imageBase64: string): void {
		this.imageService.setImage(this.userId, imageBase64).subscribe((result) => {
			if (result.success) {
				this.getUserInfo();
			}
		});
	}
	// TODO посмотреть актуальность использования внутри метода вебсокета
	private getEventsByUser(): void {
		// this.eventService.searchById( this.originUserId || this.userId );
	}

	private getUserInfo(): void {
		if (!this.originUserId) {
			this.userServiceApi.getUserById(this.userId).subscribe((user) => {
				const currentUser = user;
				if (currentUser.image) {
					this.getImage(user.image).subscribe((result) => {
						currentUser.image = result;
					});
				}
				this.user = currentUser;
			});
			return;
		}

		const localOriginUser =
			this.personalProfileManagerService.readOriginProfile;

		if (localOriginUser) {
			this.user = localOriginUser;
			return;
		}

		this.userServiceApi
			.getUserById(this.userId, this.originUserId)
			.subscribe((user) => {
				const currentUser = user;
				if (currentUser.image) {
					this.getImage(user.image).subscribe((result) => {
						currentUser.image = result;
					});
				}
				this.user = currentUser;
			});
	}

	private getImage(imageId: string): Observable<any> {
		return new Observable((subscriber) => {
			this.imageService.getImage(imageId).subscribe((result) => {
				subscriber.next(result);
				subscriber.complete();
			});
		});
	}
}
