import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorCategoriasPage } from './por-categorias.page';

describe('PorCategoriasPage', () => {
  let component: PorCategoriasPage;
  let fixture: ComponentFixture<PorCategoriasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorCategoriasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorCategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
