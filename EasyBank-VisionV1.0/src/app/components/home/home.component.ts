import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  mode: boolean = false;

  constructor(private authService: AuthService) { }

  change() {
    this.mode = !this.mode;
  }

  getUser() {
    return this.authService.getUser();
  }
}
