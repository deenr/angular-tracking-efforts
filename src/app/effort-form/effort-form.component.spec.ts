import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffortFormComponent } from './effort-form.component';

describe('EffortFormComponent', () => {
  let component: EffortFormComponent;
  let fixture: ComponentFixture<EffortFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffortFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffortFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
