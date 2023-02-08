import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {
  @Input() public listType: { type: string; name: string }[] = [];

  @Input() public isShowImage = false;

  public activeType = '';

  public ngOnInit(): void {
    this.activeType = this.listType[0].type;
  }

  public setActiveType(value: string): void {
    this.activeType = value;
  }
}
