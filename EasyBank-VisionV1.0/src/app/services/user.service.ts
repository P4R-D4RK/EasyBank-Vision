import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _URL_USER } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async getUserData(id: string): Promise<any> {
    const data = await new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${_URL_USER}/${id}`).subscribe({
        next: (value) => {
          if (value.error) reject(value.error);
          else if (value.data) {
            resolve(value.data);
          }
        },
        error: (err) => reject(err),
      });
    });
    return data ?? [];
  }
}
