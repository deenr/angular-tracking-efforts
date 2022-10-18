import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffortComponent } from './effort.component';
import { Effort } from "../effort";

import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EffortService } from '../effort.service';
import { of } from 'rxjs';

describe('EffortComponent', () => {
  let effort: Effort;
  let effortJSON: JSON;

  let component: EffortComponent;
  let fixture: ComponentFixture<EffortComponent>;

  let effortService: EffortService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffortComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ EffortService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffortComponent);
    effortService = TestBed.inject(EffortService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have empty efforts', () => {
      expect(component.efforts).toHaveSize(0);
    });
  });
  
  describe('getColors', () => {
    it('should return angular color', () => {
      expect(component.getColor("angular")).toEqual(component.angularColor);
    });
  
    it('should return javascript color', () => {
      expect(component.getColor("javascript")).toEqual(component.javascriptColor);
    });
  
    it('should return typescript color', () => {
      expect(component.getColor("typescript")).toEqual(component.typescriptColor);
    });
  
    it('should return no color', () => {
      expect(component.getColor("")).toEqual("#FFFFFF");
    });
  });

  describe('Effort class', () => {
    beforeEach(() => {
      effort = new Effort(1, 'test', 'angular', new Date().toISOString(), "https://www.google.com", 3);
      effortJSON = JSON.parse(JSON.stringify(effort));
    });

    it('should be defined', () => {
      expect(effort).toBeInstanceOf(Effort);
    });

    it('should return JSON', () => {
      expect(effortJSON).toEqual(effort.toJSON())
    });

    it('should return object from JSON', () => {
      expect(effort).toEqual(Effort.fromJSON(effortJSON))
    });
  });

  describe('Effort service', () => {
    it('should return all efforts', () => {
      let efforts: Effort[] = [
        new Effort(1, 'test', 'angular', new Date().toISOString(), "https://www.google.com", 3),
        new Effort(2, 'qeewq', 'typescript', new Date().toISOString(), "https://www.facebook.com")
      ];
      spyOn(effortService, 'getEfforts').and.returnValue(of(efforts));

      let returnedEfforts = component.getEfforts();
      
      expect(effortService.getEfforts).toHaveBeenCalled();
    });
  });
});
