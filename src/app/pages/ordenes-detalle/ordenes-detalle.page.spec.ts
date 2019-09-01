import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesDetallePage } from './ordenes-detalle.page';

describe('OrdenesDetallePage', () => {
  let component: OrdenesDetallePage;
  let fixture: ComponentFixture<OrdenesDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesDetallePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
