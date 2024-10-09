import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fundraiser} from './class/Fundraiser';
import {Category} from './class/Category';
import { map } from 'rxjs/operators';
import { FundraiserResponse} from './class/FundraiserResponse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3060/api';
  constructor(private http: HttpClient) { }

  /**
   * GET request method for Fundraiser list
   * Here use map method to makesure the Fundraiser class attributes can match the data responded
   * @return {*} {Observable<Fundraiser[]>}
   */
  getAllFundraisers():Observable<Fundraiser[]> {
    return this.http.get<FundraiserResponse[]>(this.apiUrl+'/home').pipe(
      map(data => data.map( item => new Fundraiser(item)))
    );
  }



}
