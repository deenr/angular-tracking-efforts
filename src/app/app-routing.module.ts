import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EffortComponent } from './effort/effort.component';
import { EffortFormComponent } from "./effort-form/effort-form.component";

const routes: Routes = [
  { path: '', component: EffortComponent },
  { path: 'effort', component: EffortComponent },
  { path: 'form', component: EffortFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }