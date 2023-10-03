import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UserLogin } from 'src/app/interfaces/userLogin.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MovementsService } from 'src/app/services/movements.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent implements OnInit {
  mode: boolean = false;
  user: UserLogin = {
    _id: '',
    first_name: '',
    last_name: '',
  };
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
  transferForm = new FormGroup({
    destiny_account: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.pattern('^[0-9]*$'),
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(100)]),
  });
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private movementsService: MovementsService
  ) {}

  async ngOnInit(): Promise<any> {
    this.user = this.getUser()!;
    this.userData = await this.userService.getUserData(this.user._id);
    this.transferForm.controls.quantity.addValidators(
      Validators.max(this.userData.debit_card.dc_avaliable_balance)
    );
  }

  getUser() {
    return this.authService.getUser();
  }

  change() {
    this.mode = !this.mode;
  }

  confirmTransfer() {
    console.log(this.transferForm.value);
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
        this.transferForm.value.destiny_account?.toString() +
        '</p>' +
        '<p><strong>Cantidad </strong>$' +
        this.transferForm.value.quantity?.toString() +
        '</p>',
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
        this.transfer();
      }
    });
  }

  async transfer(): Promise<any> {
    const resp = await this.movementsService.transfer({
      origin: this.userData.debit_card.dc_number,
      destination: this.transferForm.value.destiny_account!,
      amount: this.transferForm.value.quantity!,
    });
    console.log(resp);
    if (resp) {
      setTimeout(() => {
        Swal.fire({
          background: '#333333',
          color: '#FFFFFF',
          title: '¡Transferencia exitosa!',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        });
        this.transferForm.reset();
      }, 500);
      this.userData = await this.userService.getUserData(this.user._id);
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
}
