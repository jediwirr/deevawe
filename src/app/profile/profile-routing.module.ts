import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './profile';

const routes: Routes = [{ path: '', component: ProfilePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRouterModule {}
