import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { EffortService } from "../effort.service";

import { Effort } from "../effort";
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-effort-form',
  templateUrl: './effort-form.component.html',
  styleUrls: ['./effort-form.component.scss']
})
export class EffortFormComponent implements OnInit {
  public effortForm: FormGroup = new FormGroup({
    description: new FormControl(null, [Validators.required]),
    URL: new FormControl(null),
    time: new FormControl(null),
    category: new FormControl(null, [Validators.required])
  });

  public submitted: boolean = false;
  public effort?: Effort;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private effortService: EffortService,
    private location: Location) { }

  public ngOnInit(): void {
    this.getEffort();
  }

  public goToEffortRoute(): void {
    this.router.navigate(['/effort'], { relativeTo: this.route });
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
          .subscribe(_ => {
            console.log(_);
            this.goToEffortRoute();
          });
      }
    } else {
      const createdAt: string = new Date().toISOString();
      if (this.effortForm.valid) {
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
            this.goToEffortRoute()
          });
      }
    };
  }

  public getEffort(): void {
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

}
