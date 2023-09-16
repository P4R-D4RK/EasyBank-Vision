import { Injectable } from '@angular/core';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User = {
    first_name: '',
    last_name: '',
    user_number: '',
    credit_card: '',
  };

  users: User[] = [
    {
      credit_card: '5204620114785209',
      first_name: 'Eduardo',
      last_name: 'González Perez',
      password: '12345678',
      user_number: '10236',
    },
  ];

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  constructor() {}

  login(userId: string, password: string) {
    const foundUser = this.users.find(
      (user) =>
        (user.user_number == userId || user.credit_card == userId) &&
        user.password == password
    );
    if (foundUser) {
      this.setUser(foundUser);
      return true;
    }

    return false;
  }
}
