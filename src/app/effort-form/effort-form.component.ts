import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EffortService } from "../effort.service";

import { Effort } from "../effort";

@Component({
  selector: 'app-effort-form',
  templateUrl: './effort-form.component.html',
  styleUrls: ['./effort-form.component.scss']
})
export class EffortFormComponent implements OnInit {
  public effortForm!: FormGroup; 
  public submitted: boolean = false;
  public effort?: Effort;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private effortService: EffortService,
    private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    
    this.getEffort();
  }

  public goToEffortRoute(): void {
    this.router.navigate(['/effort'], { relativeTo: this.route });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.effortForm.valid) {
      if (this.effort) {
        this.effort.description = this.effortForm.get('description')?.value;
        this.effort.URL = this.effortForm.get('URL')?.value;
        this.effort.time = this.effortForm.get('time')?.value;
        this.effort.category = this.effortForm.get('category')?.value;
  
        this.effortService.updateEffort(this.effort)
          .subscribe(_ => {
            console.log(_);
            this.goToEffortRoute();
          });
      }
      else {
        const createdAt: string = new Date().toISOString();
        let effort: Effort = new Effort(
          1,
          this.effortForm.get('description')?.value,
          this.effortForm.get('category')?.value,
          createdAt,
          this.effortForm.get('URL')?.value,
          this.effortForm.get('time')?.value,
        );
        this.effortService.addEffort(effort)
          .subscribe(_ => {
            console.log(_);
            this.goToEffortRoute();
          });
      }
    }
  }

  public getEffort(): void {
    this.initialiseForm();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    console.log(id);
    if (id !== 0) {
    
      this.effortService.getEffort(id)
        .subscribe(effort => {
          console.log(effort);
          this.effort = effort;
          this.effortForm.setValue({
            description: effort.description, 
            URL: effort.URL,
            time: effort.time,
            category: effort.category
          });
        });
    }
  }

  private initialiseForm(): void {
    this.effortForm = this.formBuilder.group({
      description: [null, [Validators.required]],
      URL: [null, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)],
      time: null,
      category: [null, [Validators.required]]
    });
  }
}
