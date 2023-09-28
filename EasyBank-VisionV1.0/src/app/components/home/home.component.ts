import { Component } from '@angular/core';
import { UserLogin } from 'src/app/interfaces/userLogin.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private authService: AuthService, private userService: UserService) { }

  async ngOnInit(): Promise<any> {
    this.user = this.getUser()!;
    const userData = await this.userService.getUserData(this.user._id);
    this.cards.push(userData.debit_card);
    userData.credit_cards?.forEach((credit_card: any) => this.cards.push(credit_card));
  }

  change() {
    this.mode = !this.mode;
  }

  getUser() {
    return this.authService.getUser();
  }

}
