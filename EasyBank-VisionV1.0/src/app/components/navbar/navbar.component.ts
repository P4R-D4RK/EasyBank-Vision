import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user-interface';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  @Input() user: User = {
    first_name: '',
    last_name: '',
    user_number: '',
    debit_card: {
      dc_avaliable_balance: 0,
      dc_number: ''
    },
    credit_cards: [],
  }

  constructor(private router: Router, private authService: AuthService) {}

  getUser() {
    return this.authService.getUser();
  }

  logOut() {
    Swal.fire({
      background: '#333333',
      color: '#FFFFFF',
      title: '¿Desea cerrar sesión?',
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
      console.log(user)
      if (result.isConfirmed) {
        Swal.fire({
          background: '#333333',
          color: '#FFFFFF',
          title: '¡Hasta pronto!',
          text: user!.first_name,
          icon: 'success',
          timer: 3000,
          showConfirmButton: false
        });
        this.router.navigate(['/login']);
      }
    });
  }
}
