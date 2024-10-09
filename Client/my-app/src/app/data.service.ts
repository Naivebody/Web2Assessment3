import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fundraiser} from './class/Fundraiser';
import {Category} from './class/Category';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3060/api';
  constructor(private http: HttpClient) { }

  /**
   * GET request method for Fundraiser list
   * @return {*} {Observable<Fundraiser[]>}
   */
  getAllFundraisers():Observable<Fundraiser[]> {
    return this.http.get<Fundraiser[]>(this.apiUrl+'/home');
  }



}
