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

  public angularColor: string = "#A6120D";
  public javascriptColor: string = "#F0DB4F";
  public typescriptColor: string = "#007ACC";

  constructor(private effortService: EffortService) { }

  ngOnInit(): void {
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
      .subscribe(effort => {
        this.efforts = effort.sort((a,b)=>{
              return a.createdAt==b.createdAt?0
                    :a.createdAt>b.createdAt?-1:1
        });
      });
  }

  public deleteEffort(effort: Effort): void {
    this.efforts = this.efforts.filter(e => e !== effort);
    this.effortService.deleteEffort(effort.id)
      .subscribe();
  }
}
