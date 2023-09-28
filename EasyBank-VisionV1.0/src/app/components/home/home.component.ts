import { Component } from '@angular/core';
import { UserLogin } from 'src/app/interfaces/userLogin.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  mode: boolean = false;
  user: UserLogin = {
    _id: '',
    first_name: '',
    last_name: '',
  };

  cards: any[] = [];
  openAccordion: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.getUser()!;
    // this.cards.push(this.user.debit_card);
    // this.user.credit_cards?.forEach(credit_card => this.cards.push(credit_card));
  }

  change() {
    this.mode = !this.mode;
  }

  getUser() {
    return this.authService.getUser();
  }
}
