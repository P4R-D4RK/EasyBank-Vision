import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user-interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  mode: boolean = false;
  user: User = {
    first_name: '',
    last_name: '',
    user_number: '',
    debid_card: {
      dc_avaliable_balance: 0,
      dc_number: ''
    },
    credit_cards: []
  }

  cards: any[] = [];
  openAccordion: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.getUser()!;
    this.cards.push(this.user.debid_card);
    this.user.credit_cards?.forEach(credit_card => this.cards.push(credit_card));
  }

  change() {
    this.mode = !this.mode;
  }

  getUser() {
    return this.authService.getUser();
  }
}
