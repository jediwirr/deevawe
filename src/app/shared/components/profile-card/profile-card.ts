import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/interfaces/users';
import {Router} from "@angular/router";
import { ImageParser } from '../../../utils/image-parser';
import {LocalStorageService} from "../../../core/services/localStorage.service";

@Component({
	selector: 'app-profile-card',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.style.scss'],
})
export class ProfileCardComponent implements OnInit {
	@Input() user!: User;

	@Input() pendingSuggest = false;

	@Input() isRemoteProfile = false;

	@Output() emitSuggest = new EventEmitter();

	@Output() emitSaveImage = new EventEmitter<string>();

	public userName = '';

	public features: string[] = [];

	/**
	 * @description будет использоваться когда будет добавлен функционал с рейтингом
	 */
	public rating = 0;

	constructor(
		protected localStorageService: LocalStorageService,
		protected router: Router
	) {}

	public ngOnInit(): void {
		this.init();
	}

	public changeEmitSuggest(): void {
		this.emitSuggest.emit();
	}

	private init() {
		const { name, id, features, connections, image } = this.user;
		this.userName = name;
		this.features = features;
	}

	public saveImage(event: Event): void {
		const fileInput = event.target as HTMLInputElement;
		ImageParser.parse(fileInput).subscribe((result) => {
			this.emitSaveImage.emit(result);
		});
	}
  
	public requestSignOut(): void {
		this.localStorageService.clear();
		this.router.navigateByUrl('/');
	}
}
