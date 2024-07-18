import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InterventionListComponent } from './intervention-list/intervention-list.component';
import { InterventionFormComponent } from './intervention-form/intervention-form.component';
import { InterventionMapComponent } from './intervention-map/intervention-map.component';
import {CommonModule} from "@angular/common";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { CsvUploadComponent } from './csv-upload/csv-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    InterventionListComponent,
    InterventionFormComponent,
    InterventionMapComponent,
    CsvUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    LeafletModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    AppComponent,
    InterventionListComponent,
    InterventionFormComponent,
    InterventionMapComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
