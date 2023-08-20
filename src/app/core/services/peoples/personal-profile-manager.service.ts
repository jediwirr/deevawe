import { Injectable } from "@angular/core";
import { User } from "../../interfaces/users";

@Injectable({
	providedIn: 'root'
})

export class PersonalProfileManagerService {
	private originProfile?: User;

	public set writeOriginProfile(user: User) {
		this.originProfile = user;
	}

	public get readOriginProfile(): User | null {
		if (!this.originProfile) {
			return null;
		}

		return this.originProfile;
	}
}
