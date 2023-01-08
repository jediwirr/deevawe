import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[app-out-side-click]',
})
export class OutSideClickDirective {
  @Output() outSideClick = new EventEmitter<MouseEvent>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.path'])
  public onGlobalClick(targetElementPath: any, event: any) {
    const res = this.el.nativeElement.contains(targetElementPath.target);
    const elementRefInPath = event.find(
      (e: any) => e === this.el.nativeElement
    );
    console.log(elementRefInPath, 'event');

    if (!elementRefInPath && res) {
      this.outSideClick.emit();
    }
  }
}
