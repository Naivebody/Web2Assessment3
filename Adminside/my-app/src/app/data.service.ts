import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Fundraiser} from './class/Fundraiser';
import {map, Observable} from 'rxjs';
import {FundraiserResponse} from './class/FundraiserResponse';
import {Category} from './class/Category';
import {NgForm} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://24275235.it.scu.edu.au/api'

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

  /**
   * POST request method for add fundraiser to DB
   * @param form
   */
  postFundraisertoDB(form:NgForm):Observable<any> {
    return this.http.post<any>(this.apiUrl+'/fundraiser', form);
  }

  /**
   * PUT request method for edit fundraiser by ID to DB
   * @param form
   */
  putFundraisertoDB(ID:number,form:NgForm):Observable<any> {
    return this.http.put<any>(this.apiUrl+'/fundraiser/'+ID, form);
  }

  /**
   * GET request method for specific fundraiser by ID
   * @param ID
   * @return {*} {Observable<Fundraiser[]>}
   */
  getFundraiserByID(ID:number):Observable<Fundraiser[]> {
    return this.http.get<FundraiserResponse[]>(this.apiUrl+"/fundraiser/"+ID).pipe(
      map(data => data.map( item => new Fundraiser(item)))
    );
  }

  deleteFundraiserByID(ID:number):Observable<any> {
    return this.http.delete<any>(this.apiUrl+'/fundraiser/'+ID);
  }


}
