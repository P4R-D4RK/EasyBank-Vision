import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-investment',
  templateUrl: './new-investment.component.html',
  styleUrls: ['./new-investment.component.css'],
})

export class NewInvestmentComponent {

  investmentForm = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(100)]), 
    duration: new FormControl(0, [Validators.required]), 
  });

  durations: any[] = [
    {value: 7, viewValue: '7 días'},
    {value: 30, viewValue: '30 días'},
    {value: 70, viewValue: '70 días'},
    {value: 365, viewValue: '365 días'},
  ];

  createInvestment (){
    console.log(this.investmentForm.value)
  }
}
