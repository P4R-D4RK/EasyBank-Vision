import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, credit_card } from 'src/app/interfaces/user.interface';
import { UserLogin } from 'src/app/interfaces/userLogin.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MovementsService } from 'src/app/services/movements.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay-ccard',
  templateUrl: './pay-ccard.component.html',
  styleUrls: ['./pay-ccard.component.css'],
})
export class PayCcardComponent {
  now = new Date();
  month: string = '';
  paymentForm = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(1)])
  });
  userData: User = {
    user_number: '',
    first_name: '',
    last_name: '',
    debit_card: {
      dc_number: '',
      dc_avaliable_balance: 0,
    },
    credit_cards: [],
    password: '',
  };
  user: UserLogin = {
    _id: '',
    first_name: '',
    last_name: '',
  };
  
  constructor(
    public dialogRef: MatDialogRef<PayCcardComponent>,
    @Inject(MAT_DIALOG_DATA) public card: credit_card,
    private authService: AuthService,
    private userService: UserService,
    private movementsService: MovementsService
  ) {}

  async ngOnInit(): Promise<any> {
    this.month = new Intl.DateTimeFormat('es', { month: 'long' }).format(
      this.now
    );
    this.user = this.getUser()!;
    this.userData = await this.userService.getUserData(this.user._id);
  }

  getUser() {
    return this.authService.getUser();
  }

  confirmPayment() {
    Swal.fire({
      background: '#333333',
      color: '#FFFFFF',
      title: '¿Pagar tarjeta de crédito ' + '***' + this.card.cc_number.substring(12, 16) + ' ?',
      text: 'Cantidad: ' + this.currencyPipe(this.paymentForm.value.amount!),
      icon: 'question',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#75258B',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'rgb(190,0,0)',
      showCancelButton: true,
      reverseButtons: true,
      focusConfirm: true,
      customClass: {
        confirmButton: 'custom-focus',
      },
    }).then((result) => {
      // const user = this.getUser();
      // console.log(user);
      if (result.isConfirmed) {
        this.payCCard();
      }
    });
  }


  async payCCard(): Promise<any> {
    const resp = await this.movementsService.payCCard({
      dc_number: this.userData.debit_card.dc_number,
      cc_number: this.card.cc_number!,
      amount: this.paymentForm.value.amount!,
    });
    console.log(resp);
    if (resp) {
      setTimeout(() => {
        Swal.fire({
          background: '#333333',
          color: '#FFFFFF',
          title: '¡Pago de tarjeta de crédito exitoso!',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        });
        this.paymentForm.reset();
      }, 500);
      this.userData = await this.userService.getUserData(this.user._id);
      this.dialogRef.close(true);
    }
    else {
      Swal.fire({
        background: '#333333',
        color: '#FFFFFF',
        title: 'Oops...',
        text: 'Ocurrió un error',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  }

  currencyPipe(
    value: number,
    currencyCode: string = 'USD',
    locale: string = 'en-US'
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
  }
}
