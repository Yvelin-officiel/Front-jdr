/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GearsComponent } from './gears.component';

describe('GearsComponent', () => {
  let component: GearsComponent;
  let fixture: ComponentFixture<GearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
