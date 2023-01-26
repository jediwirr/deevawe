import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../core/interfaces/users';
import { LocalStorageService } from '../core/services/localStorage.service';
import { UsersApiService } from '../core/services/users-api.service';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfilePageComponent {
  public user!: User;

  constructor(
    private userServiceApi: UsersApiService,
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

  private async getUserInfo(id?: number): Promise<void> {
    const userId = id || await this.localStorage.getUserId();
    this.user = await this.userServiceApi.getUser(userId);
  }
}
