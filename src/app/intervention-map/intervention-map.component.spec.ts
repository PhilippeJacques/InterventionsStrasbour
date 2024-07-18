import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionMapComponent } from './intervention-map.component';

describe('InterventionMapComponent', () => {
  let component: InterventionMapComponent;
  let fixture: ComponentFixture<InterventionMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterventionMapComponent]
    });
    fixture = TestBed.createComponent(InterventionMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
