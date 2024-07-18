import { Component, OnInit } from '@angular/core';
import { InterventionsService } from '../interventions.service';
import * as L from 'leaflet';
import {GeocodingService} from "../geocoding.service";

@Component({
  selector: 'app-intervention-map',
  templateUrl: './intervention-map.component.html',
  styleUrls: ['./intervention-map.component.css']
})
export class InterventionMapComponent {
  private map!: L.Map;
  private interventions: any[] = [];

  constructor(private csvDataService: InterventionsService, private geocodingService: GeocodingService) { }

  ngOnInit(): void {
    this.initMap();
    this.loadInterventions();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [48.58392, 7.74553], // Center on Strasbourg
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadInterventions(): void {
    this.csvDataService.getCsvData().subscribe(data => {
      this.interventions = data;
      this.placeMarkers();
    });
  }

  private placeMarkers(): void {
    const customIcon = L.icon({
      iconUrl: 'assets/marker.png',
      iconSize: [25, 41], // size of the icon
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
      popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
      shadowUrl: 'assets/marker.png',
      shadowSize: [41, 41] // size of the shadow
    });

    console.log('Custom Icon Config:', customIcon);

    this.interventions.forEach(intervention => {
      const address = intervention['Adresse'].replace(/^\d+\s*/, '');
      ;
      const status = intervention['Statut de l\'intervention'];

      console.log(`Geocoding address: ${address}`); // Log address being geocoded

      this.geocodingService.geocodeAddress(address).subscribe(result => {
        if (result) {
          console.log(`Geocoded result for ${address}:`, result); // Log geocoded result

          const marker = L.marker([result.lat, result.lon], { icon: customIcon }).addTo(this.map);
          marker.bindPopup(`<b>Adresse:</b> ${address}<br><b>Status:</b> ${status}`);
        } else {
          console.warn(`Geocoding failed for address: ${address}`);
        }
      });
    });
  }

}
