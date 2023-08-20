import { NgModule } from '@angular/core';
import { OutSideClickDirective } from './outSideClick.directive';

@NgModule({
	declarations: [OutSideClickDirective],
	exports: [OutSideClickDirective],
})
export class DirectiveModule {}
