import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.style.scss'],
})
export class SelectComponent implements OnInit {
  @Input() public listType: { type: string; name: string }[] = [];

  @Input() public isShowImage = false;

  public isDropDown = false;

  public list: { type: string; name: string }[] = [];

  public searchControl = new FormControl('Drink', { nonNullable: true });

  public ngOnInit(): void {
    this.list = this.listType;
    this.searchControl.valueChanges
      .pipe(debounceTime(250))
      .subscribe((value) => {
        this.search(value);
      });
  }

  public open(): void {
    this.isDropDown = true;
  }

  public close(): void {
    this.isDropDown = false;
  }

  private search(value: string): void {
    this.list = this.listType.filter((item) => item.name.includes(value));
  }

  public selected(value: string): void {
    this.searchControl.setValue(value);
  }
}
