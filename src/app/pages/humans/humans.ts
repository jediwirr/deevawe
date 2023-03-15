import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private userService: UsersApiService,
    private localStorageService: LocalStorageService
  ) {}

  public ngOnInit(): void {
    this.valueForSearchUser.valueChanges
      .pipe(debounceTime(250))
      .subscribe((value) => this.searchUser(value));
  }

  private async searchUser(value: string): Promise<void> {
    this.userService
      .searchUser(1, value, await this.localStorageService.getUserId())
      .subscribe((user) => {
        if (!user.code) {
          this.people = user;
        }
      });
  }
}
