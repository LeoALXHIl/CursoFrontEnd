import { ComponentFixture, TestBed } from '@angular/core/testing';

import { curriculosComponent } from './curriculos.component';

describe('CurriculosComponent', () => {
  let component: curriculosComponent;
  let fixture: ComponentFixture<curriculosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [curriculosComponent]
    });
    fixture = TestBed.createComponent(curriculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
