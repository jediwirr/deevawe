import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ImageParser {

	public static parse(image: HTMLInputElement): Observable<string> {
		return new Observable((subscriber) => {
			const reader = new FileReader();
			reader.readAsDataURL(image.files![0]);
			reader.onload = (e: ProgressEvent) => {
				const imgBase64Path = (<FileReader>e.target).result;
				subscriber.next(imgBase64Path! as string);
				subscriber.complete();
			};
		});
	};
}
