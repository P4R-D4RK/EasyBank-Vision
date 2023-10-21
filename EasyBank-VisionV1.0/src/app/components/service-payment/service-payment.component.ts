import { Component } from '@angular/core';
import { AguaPaymentComponent } from '../agua-payment/agua-payment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-service-payment',
  templateUrl: './service-payment.component.html',
  styleUrls: ['./service-payment.component.css']
})
export class ServicePaymentComponent {

  constructor(public dialog: MatDialog) {}

  aguaPayment() {
    const dialogref = this.dialog.open(AguaPaymentComponent, {
      width: '30%',
      data: undefined,
    });
    dialogref.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(true);
      }
    });
  }
}
