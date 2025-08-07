import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IternaComponent } from './iterna.component';

describe('IternaComponent', () => {
  let component: IternaComponent;
  let fixture: ComponentFixture<IternaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IternaComponent]
    });
    fixture = TestBed.createComponent(IternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
