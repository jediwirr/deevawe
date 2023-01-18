import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation';
import { ToastComponent } from './toast/toast';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ToastComponent, NavigationComponent],
  exports: [ToastComponent, NavigationComponent],
})
export class SharedModule {}
