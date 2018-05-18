/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HireListComponent } from './hireList.component';

describe('HireListComponent', () => {
  let component: HireListComponent;
  let fixture: ComponentFixture<HireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
