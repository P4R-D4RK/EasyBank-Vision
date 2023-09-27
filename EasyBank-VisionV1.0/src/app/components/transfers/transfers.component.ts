import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user-interface';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent implements OnInit {
  mode: boolean = false;
  user: User = {
    first_name: '',
    last_name: '',
    user_number: '',
    debit_card: {
      dc_avaliable_balance: 0,
      dc_number: '',
    },
    credit_cards: [],
  };
  transferForm = new FormGroup({
    destiny_account: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.pattern('^[0-9]*$')
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(100)]),
  });
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.getUser()!;
  }

  getUser() {
    return this.authService.getUser();
  }

  change() {
    this.mode = !this.mode;
  }

  transfer() {
    // console.log(this.transferForm.value);
    if(this.transferForm.value.quantity! > this.user.debit_card.dc_avaliable_balance) {
      Swal.fire({
        background: '#333333',
        color: '#FFFFFF',
        title: 'Oops...',
        text: 'Saldo insuficiente',
        icon: 'warning',
        timer: 3000,
        showConfirmButton: false,
      });
    }
    else {

      Swal.fire({
        background: '#333333',
        color: '#FFFFFF',
        title: '¿Realizar transferencia?',
        text: 'Destino: ' + this.transferForm.value.destiny_account?.toString(),
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
      });
      Swal.fire({
        background: '#333333',
        color: '#FFFFFF',
        title: '¿Realizar transferencia?',
        html:
          '<p><strong>Destino </strong> ' +
          this.transferForm.value.destiny_account?.toString() + '</p>' +
          '<p><strong>Cantidad </strong>$' + this.transferForm.value.quantity?.toString() + '</p>',
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
        const user = this.getUser();
        console.log(user);
        if (result.isConfirmed) {
          Swal.fire({
            background: '#333333',
            color: '#FFFFFF',
            title: '¡Transferencia exitosa!',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
          });
          this.transferForm.reset();
        }
      });
    }
  }
}
