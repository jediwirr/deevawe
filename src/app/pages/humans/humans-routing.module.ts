import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HumansPageComponent } from './humans';

const routes: Routes = [{ path: '', component: HumansPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumansRoutingModule {}
