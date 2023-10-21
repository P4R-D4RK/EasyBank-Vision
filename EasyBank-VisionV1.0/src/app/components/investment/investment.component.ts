import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewInvestmentComponent } from '../new-investment/new-investment.component';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent {
  investments: any[] = [
    { name: '$6,000  a un plazo de:' },
    { name: '$4,000 a un plazo de:' },
    { name: '$5,550 a un plazo de:' },
  ];
  mode: boolean = false
  constructor(public dialog: MatDialog) {}

  newInvestment() {
    const dialogref = this.dialog.open(NewInvestmentComponent, {
      width: '30%',
      data: undefined,
    });
    dialogref.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(true);
      }
    });
  }

  change() {
    this.mode = !this.mode;
  }
}