import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProfilePageComponent } from './profile';
import { ProfileCardComponent } from './profile-card/profile-card';
import { ProfileRouterModule } from './profile-routing.module';

@NgModule({
  imports: [ProfileRouterModule, SharedModule],
  declarations: [ProfilePageComponent, ProfileCardComponent],
  exports: [ProfilePageComponent],
})
export class ProfileModule {}
