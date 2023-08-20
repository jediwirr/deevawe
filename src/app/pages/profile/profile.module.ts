import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProfilePageComponent } from './profile';
import { ProfileRouterModule } from './profile-routing.module';

@NgModule({
	imports: [ProfileRouterModule, SharedModule],
	declarations: [ProfilePageComponent],
	exports: [ProfilePageComponent],
})
export class ProfileModule {}
