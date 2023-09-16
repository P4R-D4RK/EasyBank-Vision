import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private router: Router, private authService: AuthService) {

  }

  getUser() {
    return this.authService.getUser();
  }

  change() {
    this.mode = !this.mode;
  }

  validateUser() {
    const foundUser = this.authService.login(this.userForm.value.user!, this.userForm.value.password!)
    if (foundUser) {
      const user = this.getUser();
      Swal.fire({
        background: '#333333',
        color: '#FFFFFF',
        title: 'Bienvenido',
        text: user.first_name,
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
