import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffortFormComponent } from './effort-form.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Effort } from '../effort';
import { EffortService } from '../effort.service';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

describe('EffortFormComponent', () => {
  let component: EffortFormComponent;
  let fixture: ComponentFixture<EffortFormComponent>;

  let effortService: EffortService;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffortFormComponent ],
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule
      ],
      providers: [ EffortService ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffortFormComponent);
    effortService = TestBed.inject(EffortService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set submitted to false', () => {
      expect(component.submitted).toBeFalse();
    });

    it('effort should be empty', () => {
      expect(component.effort).toBeFalsy();
    });
  });

  describe('form', () => {
    it('should be invalid when empty', () => {
      expect(component.effortForm.valid).toBeFalsy();
    });

    it('description field validity', () => {
      let description = component.effortForm.controls['description'];
      expect(description.valid).toBeFalsy();

      let errors = description.errors || {};
      expect(errors['required']).toBeTruthy();

      description.setValue("Writing Angular Application");
      errors = description.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('category frield validity', () => {
      let category = component.effortForm.controls['category'];
      expect(category.valid).toBeFalsy();

      let errors = category.errors || {};
      expect(errors['required']).toBeTruthy();

      category.setValue("angular");
      errors = category.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('submitting a form emits an effort object', () => {
      expect(component.effortForm.valid).toBeFalsy();
      component.effortForm.controls['description'].setValue("Writing Angular Application");
      component.effortForm.controls['category'].setValue("angular");
      expect(component.effortForm.valid).toBeTruthy();

      let effort: Effort;
    });

    describe('getEffort', () => {
      it('should return no object', () => {
        let effort: Effort = new Effort(1, 'test', 'angular', new Date().toISOString(), "https://www.google.com", 3);
        spyOn(effortService, 'getEffort').and.returnValue(of(effort));

        spyOn(route.snapshot.paramMap, 'get').and.returnValue('0');
  
        let requestedEffort = component.getEffort();
        
        expect(effortService.getEffort).not.toHaveBeenCalled();
      });
      
      it('should return requested effort object', () => {
        let effort: Effort = new Effort(1, 'test', 'angular', new Date().toISOString(), "https://www.google.com", 3);
        spyOn(effortService, 'getEffort').and.returnValue(of(effort));

        spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
  
        let requestedEffort = component.getEffort();
        
        expect(effortService.getEffort).toHaveBeenCalled();
      });

      describe('onSubmit', () => {
        beforeEach(() => {
          spyOn(router, 'navigate');
        });

        it('should return submit true', () => {
          component.onSubmit();
          expect(component.submitted).toBeTrue();
        })

        it('should do nothing with invalid form', () => {
          let description: string = "Writing Angular Application";
          let category: string =  "angular";

          expect(component.effortForm.valid).toBeFalsy();

          let effort: Effort = new Effort(1, description, category, new Date().toISOString());
          component.effort = effort;

          spyOn(effortService, 'addEffort').and.returnValue(of(effort.id));
          spyOn(effortService, 'updateEffort').and.returnValue(of(effort));
    
          component.onSubmit();
          
          expect(effortService.addEffort).not.toHaveBeenCalled();
          expect(effortService.updateEffort).not.toHaveBeenCalled();
          expect(router.navigate).not.toHaveBeenCalled();
        });

        it('should update an effort object', () => {
          let description: string = "Writing Angular Application";
          let category: string =  "angular";

          expect(component.effortForm.valid).toBeFalsy();
          component.effortForm.controls['description'].setValue(description);
          component.effortForm.controls['category'].setValue(category);
          expect(component.effortForm.valid).toBeTruthy();

          let effort: Effort = new Effort(1, description, category, new Date().toISOString());
          component.effort = effort;

          spyOn(effortService, 'updateEffort').and.returnValue(of(effort));
    
          component.onSubmit();
          
          expect(effortService.updateEffort).toHaveBeenCalledWith(effort);
          expect(router.navigate).toHaveBeenCalledWith(['/effort'], { relativeTo: route });
        });

        it('should add an effort object', () => {
          let description: string = "Writing Angular Application";
          let category: string =  "angular";

          expect(component.effortForm.valid).toBeFalsy();
          component.effortForm.controls['description'].setValue(description);
          component.effortForm.controls['category'].setValue(category);
          expect(component.effortForm.valid).toBeTruthy();

          let newEffort: Effort = new Effort(1, description, category, new Date().toISOString());

          spyOn(effortService, 'addEffort').and.returnValue(of(newEffort.id));
    
          component.onSubmit(); 
          
          expect(router.navigate).toHaveBeenCalledWith(['/effort'], { relativeTo: route });
        });
      });
    });
  });
});
