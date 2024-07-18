import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InterventionsService } from '../interventions.service';

@Component({
  selector: 'app-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: ['./intervention-list.component.css']
})
export class InterventionListComponent implements OnInit {
  interventions: any[] = [];
  selectedIntervention: any = null;

  constructor(private interventionsService: InterventionsService) { }

  ngOnInit(): void {
    this.loadInterventions();
  }

  private loadInterventions(): void {
    this.interventionsService.getCsvData().subscribe(data => {
      this.interventions = data;
    });
  }

  selectIntervention(intervention: any): void {
    this.selectedIntervention = { ...intervention };
  }

  saveIntervention(): void {
    const index = this.interventions.findIndex(i => i['Adresse'] === this.selectedIntervention['Adresse']);
    if (index > -1) {
      this.interventions[index] = this.selectedIntervention;
    } else {
      this.interventions.push(this.selectedIntervention);
    }
    this.selectedIntervention = null;
  }

  saveAllInterventions(): void {
    this.interventionsService.saveCsvData(this.interventions).subscribe((repone) => {
      console.log(repone)
      alert('Data saved successfully!');
      this.loadInterventions();
    });
  }

  addNewIntervention(): void {
    this.selectedIntervention = { Adresse: '', 'Statut de l\'intervention': '' };
  }
}
