import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Fundraiser} from './Class/Fundraiser';
import {map, Observable} from 'rxjs';
import {FundraiserResponse} from './Class/FundraiserResponse';
import {Category} from './Class/Category';
import {NgForm} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3060/api'

  constructor(private http: HttpClient) { }

  /**
   * GET request method for Fundraiser list
   * @return {*} {Observable<Fundraiser[]>}
   */
  getAllFundraisers():Observable<Fundraiser[]> {
    return this.http.get<FundraiserResponse[]>(this.apiUrl+'/fundraisers').pipe(
      map(data => data.map( item => new Fundraiser(item)))
    );
  }

  /**
   * GET request method for Category list
   * @return {*} {Observable<Category[]>}
   */
  getAllCategories():Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl+'/search');
  }

  postFundraisertoDB(form:NgForm):Observable<any> {
    return this.http.post<FundraiserResponse[]>(this.apiUrl+'/fundraiser', form).pipe(
      map(data => data.map( item => new Fundraiser(item)))
    );
  }

}
