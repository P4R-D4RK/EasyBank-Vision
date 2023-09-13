import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  mode: boolean = false;
  userForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  users: User[] = [
    {
      credit_card: '5204620114785209',
      first_name: 'Eduardo',
      last_name: 'González Perez',
      password: '12345678',
      user_number: '10236',
    },
  ];

  constructor(private router: Router) {

  }

  change() {
    this.mode = !this.mode;
  }

  validateUser() {
    const foundUser = this.users.find(
      (user) =>
        (user.user_number == this.userForm.value.user ||
          user.credit_card == this.userForm.value.user) &&
        user.password == this.userForm.value.password
    );
    if (foundUser) {
      Swal.fire({
        background: '#333333',
        color: '#FFFFFF',
        title: 'Bienvenido',
        text: foundUser.first_name,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      });
      this.router.navigate(['/home']);

    } else {
      Swal.fire({
        background: '#333333',
        color: '#FFFFFF',
        title: 'Oops...',
        text: 'Usuario y/o contraseña incorrecto(s)',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  }
}
