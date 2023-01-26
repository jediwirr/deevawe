import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.style.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;

  // private marker!: L.Marker;

  private position = new BehaviorSubject<[] | number[]>([]);

  constructor() {
    navigator.geolocation.getCurrentPosition(
      this.success.bind(this),
      this.error,
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
    this.position.subscribe((result) => {
      if (result.length) {
        this.initMap(result);
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
    this.marker(coordinates, 'You');
    this.map.on('click', ({ latlng }) => {
      const { lat, lng } = latlng;
      this.marker([lat, lng], 'text');
    });
  }

  private marker(coordinates: number[], message: string): void {
    L.marker(coordinates as L.LatLngExpression)
      .addTo(this.map)
      .bindPopup(message)
      .openPopup();
  }

  private success({ coords }: { coords: GeolocationCoordinates }): void {
    const { latitude, longitude } = coords;
    this.position.next([latitude, longitude]);
  }

  private error(geoError: GeolocationPositionError): void {
    throw new Error(`${geoError.message}`);
  }

  public ngOnDestroy(): void {
    this.position.unsubscribe();
  }
}
