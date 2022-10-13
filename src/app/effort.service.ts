import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Effort } from "./effort";

@Injectable({
  providedIn: 'root'
})
export class EffortService {
  private effortURL: string = "https://6347d5a50484786c6e89ebfe.mockapi.io/effort/";

  constructor(private http: HttpClient) { }

  public getEfforts(): Observable<Effort[]> {
    return this.http.get<Effort[]>(this.effortURL);
  }

  public addEffort(effort: Effort): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(effort);
    return this.http.post<Effort>(this.effortURL, body, {'headers':headers});
  }


  
  public deleteEffort(id: number): Observable<any> {
    let httpheaders=new HttpHeaders()
    .set('Content-type','application/Json');
    let options={
      headers:httpheaders
    };
    return this.http.delete<Effort>(this.effortURL + id);
  }
}
