import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { credit_card } from 'src/app/interfaces/user.interface';
import { UserLogin } from 'src/app/interfaces/userLogin.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { PayCcardComponent } from '../pay-ccard/pay-ccard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
  now = new Date();
  month: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<any> {
    this.month = new Intl.DateTimeFormat('es', { month: 'long' }).format(
      this.now
    );
    this.user = this.getUser()!;
    const userData = await this.userService.getUserData(this.user._id);
    this.cards.push(userData.debit_card);
    userData.credit_cards?.forEach((credit_card: any) =>
      this.cards.push(credit_card)
    );
  }

  change() {
    this.mode = !this.mode;
  }

  getUser() {
    return this.authService.getUser();
  }

  payCCard(card: credit_card) {
    const dialogRef = this.dialog.open(PayCcardComponent, {
      width: '35%',
      data: card,
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        this.cards = [];
        const userData = await this.userService.getUserData(this.user._id);
        this.cards.push(userData.debit_card);
        userData.credit_cards?.forEach((credit_card: any) =>
          this.cards.push(credit_card)
        );
      }
    });
  }
}
