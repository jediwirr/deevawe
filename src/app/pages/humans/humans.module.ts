import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HumansRoutingModule } from './humans-routing.module';
import { HumansPageComponent } from './humans';

@NgModule({
  imports: [HumansRoutingModule, ReactiveFormsModule, SharedModule],
  declarations: [HumansPageComponent],
  exports: [HumansPageComponent],
})
export class HumansModule {}
