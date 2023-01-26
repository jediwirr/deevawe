import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import * as L from "leaflet";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.style.scss']
})

export class MapComponent implements AfterViewInit, OnDestroy {
    private map!: L.Map;

    // private marker!: L.Marker;

    private position = new BehaviorSubject<[] | number[]>([]);

    constructor() {
        navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error, {
            enableHighAccuracy: true
        });
    }

    public ngAfterViewInit(): void {
        this.position.subscribe((result) => {
            if (result.length) {
                this.initMap(result);
            }
        });
    }

    private initMap(coordinates: number[]): void {
            this.map = L.map('map', {
                center: coordinates as L.LatLngExpression,
                zoom: 18
            });
    
            const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                minZoom: 3,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            });
    
            tiles.addTo(this.map);
            // eslint-disable-next-line new-cap
            // L.marker(coordinates as L.LatLngExpression).addTo(this.map).bindPopup('You').openPopup();
            this.marker(coordinates, 'You');
            // this.marker.bindPopup('You').openPopup();
            // this.marker.addTo(this.map);
            // this.map.flyTo(coordinates as L.LatLngExpression);
        //    this.marker = new L.marker(coordinates)
        this.map.on('click', ({latlng}) => {
            const {lat, lng} = latlng;
            this.marker([lat, lng], 'text');
        });
    }

    private marker(coordinates: number[], message: string): void {
        L.marker(coordinates as L.LatLngExpression).addTo(this.map).bindPopup(message).openPopup();
    }

    private success({ coords }: { coords: GeolocationCoordinates}): void {
        const { latitude, longitude } = coords;
        this.position.next([latitude, longitude]);
    }

    private error(geoError:GeolocationPositionError): void {
        throw new Error(`${geoError.message}`);
    }

    public ngOnDestroy(): void {
        this.position.unsubscribe();
    }
}