import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPage } from './producto.page';

describe('ProductoPage', () => {
  let component: ProductoPage;
  let fixture: ComponentFixture<ProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
