import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './home';
import { HomePageRouterModule } from './home-routing.module';

@NgModule({
  imports: [HomePageRouterModule, SharedModule],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
})
export class HomePageModule {}
