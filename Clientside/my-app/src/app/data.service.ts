import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {Fundraiser} from './class/Fundraiser';
import {Category} from './class/Category';
import { map } from 'rxjs/operators';
import { FundraiserResponse} from './class/FundraiserResponse';
import {Donation} from './class/Donation';
import {NgForm} from '@angular/forms';
/**
 * DataService is an Angular service class that interacts with backend APIs
 * The @Injectable decorator marks the service as injectable and can be used in the root injector
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://24275235.it.scu.edu.au/api';
  constructor(private http: HttpClient) { }

  /**
   * GET request method for Fundraiser list
   * Here use map method to make sure the Fundraiser class attributes can match the data responded
   * @return {*} {Observable<Fundraiser[]>}
   */
  getAllFundraisers():Observable<Fundraiser[]> {
    return this.http.get<FundraiserResponse[]>(this.apiUrl+'/home').pipe(
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
   * GET request method for specific Fundraiser list by details
   * @param city
   * @param organizer
   * @param category
   * @return {*} {Observable<Fundraiser>}
   */
  getFundraiserBySearch(active:number, city?: string, organizer?: string, category?: string):Observable<Fundraiser[]> {
    let url = `${this.apiUrl}/search`;
    const params  = [];
    if (city) {
      params.push(city);
    }else{
      params.push(" ");
    }

    if (organizer) {
      params.push(organizer);
    }else{
      params.push(" ");
    }

    if (category) {
      params.push(category);
    }else{
      params.push(" ");
    }

    params.push(active);

    if (params.length > 0 ) {
      url += '/' + params.join('/');
    }
    console.log(url);
    if(url !== this.apiUrl +'/search/ '+'/ '+'/ '+'/'+active){
    return this.http.get<FundraiserResponse[]>(url).pipe(
      map(data => data.map( item => new Fundraiser(item)))
    );
    }else{
      alert("Except ACTIVE,at least one criteria is given.");
      return of([]);
    }
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

  /**
   * GET request method for specific donation list by fundraiserID
   * @param ID
   * @return {*} {Observable<Donation[]>}
   */
  getDonationByFundraiserID(ID:number):Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.apiUrl}/fundraiser/donation/${ID}`).pipe(
      map((data: Donation[]) =>{
        return data.map(item =>{
          item.DATE = new Date(item.DATE);
          return item;
        })
      })
    );
  }

  /**
   * POST request method for adding donation to specific fundraiser
   * @param form
   * @return {*} {Observable<any(For the json message)>}
   */
  postDonationtoDB(form:NgForm):Observable<any>{
    return this.http.post<Donation>(`${this.apiUrl}/donate`,form);
  }


}
