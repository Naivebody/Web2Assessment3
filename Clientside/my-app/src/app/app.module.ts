import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FundraiserDetailComponent } from './fundraiser-detail/fundraiser-detail.component';
import {FormsModule} from "@angular/forms";
import { DonateComponent } from './donate/donate.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import { AdmincreateComponent } from './admincreate/admincreate.component';
import { AdmineditComponent } from './adminedit/adminedit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FundraiserDetailComponent,
    DonateComponent,
    AdminhomeComponent,
    AdmincreateComponent,
    AdmineditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
