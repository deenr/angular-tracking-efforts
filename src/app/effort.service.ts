import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'lodash-es';
import {Observable} from 'rxjs';
import {map as rxjsMap} from 'rxjs/operators';

import { Effort } from "./effort";

@Injectable({
  providedIn: 'root'
})
export class EffortService {
  private effortURL: string = "https://6347d5a50484786c6e89ebfe.mockapi.io/effort";

  constructor(private http: HttpClient) { }

  public getEfforts(): Observable<Effort[]> {
    return this.http.get(this.effortURL).pipe(
      rxjsMap((effortsJSON: any) => {
        return map(effortsJSON, (effortJSON: any) => {
          return Effort.fromJSON(effortJSON);
        });
      })
    );
  }

  public getEffort(id: number): Observable<Effort> {
    return this.http.get<Effort>(`${this.effortURL}/${id}`).pipe(
      rxjsMap((effortJSON: any) => {
        return Effort.fromJSON(effortJSON)
      })
    );
  }

  public addEffort(effort: Effort): Observable<number> {
    return this.http.post<{id: number}>(this.effortURL, effort.toJSON())
      .pipe(rxjsMap((response: {id: number}) => response.id));
  }

  public deleteEffort(id: number): Observable<Effort> {
    return this.http.delete<Effort>(`${this.effortURL}/${id}`);
  }

  public updateEffort(effort: Effort): Observable<Effort> {
    return this.http.put<Effort>(`${this.effortURL}/${effort.id}`, effort.toJSON());
  }
}
