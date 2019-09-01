import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesPage } from './ordenes.page';

describe('OrdenesPage', () => {
  let component: OrdenesPage;
  let fixture: ComponentFixture<OrdenesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
