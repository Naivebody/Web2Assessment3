import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

//Services
@Injectable({
  providedIn: 'root'
})
export class FundraiserService {
  private apiUrl = 'http://localhost:3060/api/fundraiser';

  constructor(private http: HttpClient) {}

  searchFundraisers(criteria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, criteria);
  }

  getFundraiser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addFundraiser(fundraiser: any): Observable<any> {
    return this.http.post(this.apiUrl, fundraiser);
  }

  addDonation(donation: any): Observable<any> {
    return this.http.post('http://localhost:3060/api/donation', donation);
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
