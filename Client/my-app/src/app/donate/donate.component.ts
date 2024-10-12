import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Data:', form.value);
    }
  }

}
