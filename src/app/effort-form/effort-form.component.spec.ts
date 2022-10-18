import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffortFormComponent } from './effort-form.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('EffortFormComponent', () => {
  let component: EffortFormComponent;
  let fixture: ComponentFixture<EffortFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffortFormComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
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
