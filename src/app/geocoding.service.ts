import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor(private http: HttpClient) { }

  geocodeAddress(address: string): Observable<{ lat: number, lon: number } | null> {
    const cleanedAddress = address.replace(/^\d+\s*/, '');
    console.log(cleanedAddress)
    const encodedAddress = encodeURIComponent(cleanedAddress);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`;

    return this.http.get<any[]>(url).pipe(
      map(results => {
        if (results && results.length > 0) {
          return {
            lat: parseFloat(results[0].lat),
            lon: parseFloat(results[0].lon)
          };
        }
        return null;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Geocoding error:', error);
        return of(null); // Return null if there's an error
      })
    );
  }
}
