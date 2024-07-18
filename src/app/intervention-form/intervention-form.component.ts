import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-intervention-form',
  templateUrl: './intervention-form.component.html',
  styleUrls: ['./intervention-form.component.css']
})
export class InterventionFormComponent implements OnInit {
  @Input() intervention: any;
  @Output() formSubmit = new EventEmitter<any>();
  interventionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.interventionForm = this.fb.group({
      Adresse: ['', Validators.required],
      'Type d\'intervention': ['', Validators.required],
      'Précision de l\'intervention': ['', Validators.required],
      'Statut de l\'intervention': ['', Validators.required],
      'Date de l\'intervention': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.intervention) {
      this.interventionForm.patchValue(this.intervention);
    }
  }

  onSubmit() {
    if (this.interventionForm.valid) {
      this.formSubmit.emit(this.interventionForm.value);
      this.interventionForm.reset();
    }
  }
}
