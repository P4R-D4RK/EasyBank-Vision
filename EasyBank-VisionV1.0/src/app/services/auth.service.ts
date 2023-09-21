import { Injectable } from '@angular/core';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  users: User[] = [
    {
      debid_card: {
        dc_avaliable_balance: 25000,
        dc_number: '5204620124780140'
      },
      credit_cards: [
        {
          cc_number: '5204620114785209',
          cc_total_credit: 5000,
          cc_avaliable_credit: 3675,
        },
      ],
      first_name: 'Eduardo',
      last_name: 'González Perez',
      password: '12345678',
      user_number: '10236',
    },
  ];

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.user;
  }

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  login(userId: string, password: string) {
    const foundUser = this.users.find(
      (user) =>
        (user.user_number == userId ||
          user.credit_cards?.find((value) => value.cc_number == userId)) &&
        user.password == password
    );
    if (foundUser) {
      this.setUser(foundUser);
      return true;
    }

    return false;
  }
}
