import { Component, OnInit } from '@angular/core';

import { EffortService } from "../effort.service";

import { Effort } from "../effort";
@Component({
  selector: 'app-effort',
  templateUrl: './effort.component.html',
  styleUrls: ['./effort.component.scss']
})
export class EffortComponent implements OnInit {

  public efforts: Effort[] = [];

  public angularColor: string = "#D1495B";
  public javascriptColor: string = "#EDAE49";
  public typescriptColor: string = "#4A88ED";

  public displayedColumns: string[] = ['description', 'time', 'category', 'created', 'delete', 'update'];

  public constructor(private effortService: EffortService) { }

  public ngOnInit(): void {
    this.getEfforts();
  }

  public getColor(category: string): string {
    switch(category) {
      case "angular":
        return this.angularColor;
      case "javascript":
        return this.javascriptColor;
      case "typescript":
        return this.typescriptColor;
      default:
        return "#FFFFFF";
    } 
  }

  public getEfforts(): void {
    this.effortService.getEfforts()
      .subscribe(efforts => {
        console.log(efforts)
        this.efforts = efforts.sort((a,b)=>{
              return a.createdAt==b.createdAt?0
                    :a.createdAt>b.createdAt?-1:1
        });
      });
  }

  public deleteEffort(effort: Effort): void {
    this.efforts = this.efforts.filter(e => e !== effort);
    this.effortService.deleteEffort(effort.id)
      .subscribe(_ => console.log(_));
  }
}
