import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/users';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.style.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() user!: User;

  public userName = '';

  public features: string[] = [];

  public ngOnInit(): void {
    this.init();
  }

  private init() {
    const { name, id, features, connections, image } = this.user;
    this.userName = name;
    this.features = features;
  }
}
