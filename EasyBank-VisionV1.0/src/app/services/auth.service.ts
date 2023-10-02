import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _URL_AUTH } from '../../config/config';
import { UserLogin } from '../interfaces/userLogin.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: UserLogin | null = null;

  users: UserLogin = {
    _id: '',
    first_name: '',
    last_name: '',
  };

  setUser(user: UserLogin) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.user;
  }

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  async login(user_number_or_cc: string, password: string): Promise<any> {
    const body = {
      user_number_or_cc,
      password,
    };
    const data = await new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${_URL_AUTH}/log-in`, body).subscribe({
        next: (value) => {
          if (value.error) reject(value.error);
          else if (value.data) {
            console.log(value.data);
            this.setUser(value.data);
            resolve(value.data);
          }
        },
        error: (err) => reject(err),
      });
    });
    return data ?? [];
  }
}
