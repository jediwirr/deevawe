import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PersonalProfileManagerService } from "../../core/services/peoples/personal-profile-manager.service";
import { LocalStorageService } from '../../core/services/localStorage.service';
import { UsersApiService } from '../../core/services/users-api.service';
import { User } from '../../core/interfaces/users';

@Component({
	templateUrl: './humans.component.html',
	styleUrls: ['./humans.style.scss'],
})
export class HumansPageComponent implements OnInit {
	public valueForSearchUser = new FormControl<string>('', {
		nonNullable: true,
	});

	public people?: User;

	public isNotFound = false;

	public actionsButton = [
		{value: 'Мои друзья'},
		{value: 'Входящие заявки'},
		{value: 'Исходящие заявки'},
	];

	constructor(
		private userService: UsersApiService,
		private localStorageService: LocalStorageService,
		private personalProfileManagerService: PersonalProfileManagerService,
		protected router: Router
	) {}

	public ngOnInit(): void {
		this.valueForSearchUser.valueChanges
			.pipe(debounceTime(250))
			.subscribe((value) => this.searchUser(value));
	}

	private async searchUser(value: string): Promise<void> {
		this.userService
			.getUserByName(await this.localStorageService.getUserId(), value)
			.subscribe((user) => {
				if (!user.code) {
					console.log(user);

					this.people = user;
				}
			});
	}

	public redirectToProfile(user: User): void {
		this.personalProfileManagerService.writeOriginProfile = user;
		this.router.navigate(['profile'], { queryParams: { id: user.id }});
	}
}
