import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {
  // private csvUrl = 'assets/interventions.csv';
  //
  // constructor(private http: HttpClient) { }
  //
  // getCsvData(): Observable<any[]> {
  //   return new Observable(observer => {
  //     this.http.get(this.csvUrl, { responseType: 'text' }).subscribe(
  //       data => {
  //         const parsedData = Papa.parse(data, { header: true }).data;
  //         observer.next(parsedData);
  //         observer.complete();
  //       },
  //       error => {
  //         observer.error(error);
  //       }
  //     );
  //   });
  // }
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getCsvData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/interventions`);
  }

  saveCsvData(data: any[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/save-csv`, data);
  }
}
