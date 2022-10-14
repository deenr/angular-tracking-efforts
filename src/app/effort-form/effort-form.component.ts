import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { EffortService } from "../effort.service";

import { Effort } from "../effort";
import { connect } from 'rxjs';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-effort-form',
  templateUrl: './effort-form.component.html',
  styleUrls: ['./effort-form.component.scss']
})
export class EffortFormComponent implements OnInit {
  public effortForm: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
    URL: new FormControl(''),
    time: new FormControl(''),
    category: new FormControl('', [Validators.required])
  });

  public submitted: boolean = false;
  public effort?: Effort; 
  
  constructor(
    private route: ActivatedRoute,
    private effortService: EffortService, 
    private location: Location) { }

  ngOnInit(): void {
    this.getEffort();
  }

  goBack(): void {
    this.location.back();
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.effort) {
      if (this.effortForm.valid) {
        this.effort.description = this.effortForm.get('description')?.value;
        this.effort.URL = this.effortForm.get('URL')?.value;
        this.effort.time = this.effortForm.get('time')?.value;
        this.effort.category = this.effortForm.get('category')?.value;

        this.effortService.updateEffort(this.effort)
          .subscribe(() => this.goBack());
      }
    } else {
      const createdAt: Date = new Date();
      if (this.effortForm.valid) {
        let effort: Effort = {...this.effortForm.value, createdAt};
        this.effortService.addEffort(effort)
          .subscribe(() => this.goBack());
      }
    }
  }

  getEffort(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.effortService.getEffort(id)
      .subscribe(effort => {
        this.effort = effort;
        this.effortForm.patchValue({...this.effort});
      });
  }

}
