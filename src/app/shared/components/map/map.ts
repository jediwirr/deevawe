import {
	AfterViewInit,
	Component,
	OnDestroy,
	EventEmitter,
	Output,
} from '@angular/core';
import * as L from 'leaflet';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.style.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
	private map!: L.Map;

	private marker!: L.Marker;

	private position = new BehaviorSubject<[] | number[]>([]);

	private isTrustGeo = new BehaviorSubject(false);

	@Output() closeMap = new EventEmitter<number[] | undefined>(undefined);

	constructor() {
		navigator.geolocation.getCurrentPosition(
			this.success.bind(this),
			this.error.bind(this),
			{
				enableHighAccuracy: true,
			}
		);

		// fix icon map
		const iconRetinaUrl = '../../../assets/images/map/marker-icon-2x.png';
		const iconUrl = '../../../assets/images/map/marker-icon.png';
		const shadowUrl = '../../../assets/images/map/marker-shadow.png';
		const iconDefault = L.icon({
			iconRetinaUrl,
			iconUrl,
			shadowUrl,
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			tooltipAnchor: [16, -28],
			shadowSize: [41, 41],
		});
		L.Marker.prototype.options.icon = iconDefault;
	}

	public ngAfterViewInit(): void {
		this.isTrustGeo.subscribe((result) => {
			if (result) {
				this.initMap(this.position.value);
			}
		});
	}

	private initMap(coordinates: number[]): void {
		this.map = L.map('map', {
			center: coordinates as L.LatLngExpression,
			zoom: 18,
		});

		const tiles = L.tileLayer(
			'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{
				maxZoom: 18,
				minZoom: 3,
				attribution:
					'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			}
		);

		tiles.addTo(this.map);
		this.addMarker(coordinates, 'You');
		this.eventListenerClickMap();
	}

	private eventListenerClickMap(): void {
		this.map.on('click', ({ latlng }) => {
			const { lat, lng } = latlng;
			if (this.marker) {
				this.map.removeLayer(this.marker);
			}
			this.addMarker([lat, lng], 'text');
		});
	}

	private addMarker(coordinates: number[], message: string): void {
		this.marker = L.marker(coordinates as L.LatLngExpression);
		this.marker.addTo(this.map).bindPopup(message).openPopup();
	}

	public submitPosition(): void {
		this.closeMap.emit(this.position.value);
	}

	private success({ coords }: { coords: GeolocationCoordinates }): void {
		const { latitude, longitude } = coords;
		this.position.next([latitude, longitude]);
		this.isTrustGeo.next(true);
	}

	private error(geoError: GeolocationPositionError): void {
		this.closeMap.emit();
		throw new Error(`${geoError.message}`);
	}

	public ngOnDestroy(): void {
		this.position.unsubscribe();
	}
}
