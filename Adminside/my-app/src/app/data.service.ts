import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Fundraiser} from './Class/Fundraiser';
import {map, Observable} from 'rxjs';
import {FundraiserResponse} from './Class/FundraiserResponse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3060/api'

  constructor(private http: HttpClient) { }

  getAllFundraisers():Observable<Fundraiser[]> {
    return this.http.get<FundraiserResponse[]>(this.apiUrl+'/home').pipe(
      map(data => data.map( item => new Fundraiser(item)))
    );
  }
}
