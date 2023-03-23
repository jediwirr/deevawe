import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime } from 'rxjs';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.style.scss'],
})
export class SelectComponent implements OnInit {
	@Input() public listType: { type: string; name: string }[] = [];

	@Input() public isShowImage = false;

	@Output() public emitOptionSelect = new EventEmitter();

	public isDropDown = false;

	public list: { type: string; name: string }[] = [];

	public searchControl = new FormControl<string>('', { nonNullable: true });

	public activeTypeImage = 'drink';

	public ngOnInit(): void {
		this.list = this.listType;
		this.searchControl.patchValue(this.listType[0].name);
		this.searchControl.valueChanges
			.pipe(debounceTime(250))
			.subscribe((value: string) => {
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

	public selected(value: string, type: string): void {
		this.searchControl.patchValue(value);
		this.activeTypeImage = type;
		this.emitOptionSelect.emit(value);
	}
}
