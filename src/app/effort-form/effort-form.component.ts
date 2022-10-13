import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { EffortService } from "../effort.service";

import { Effort } from "../effort";

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
  
  constructor(
    private effortService: EffortService, 
    private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  public onSubmit(): void {
    this.submitted = true;
    const createdAt: Date = new Date();
    if (this.effortForm.valid) {
      let effort: Effort = {...this.effortForm.value, createdAt};
      this.effortService.addEffort(effort)
        .subscribe(() => this.goBack());
    }
  }

}
