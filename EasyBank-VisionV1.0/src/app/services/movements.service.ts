import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transfer } from '../interfaces/transfer.interface';
import { _URL_MOVEMENTS } from 'src/app/config/config';
import { PayCCard } from '../interfaces/payCCard.interface';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor(private http: HttpClient) {}

  async transfer(transferInformation: Transfer): Promise<any> {
    const data = await new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${_URL_MOVEMENTS}/transfer`,transferInformation).subscribe({
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
  
  async payCCard(paymentInformation: PayCCard): Promise<any> {
    const data = await new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${_URL_MOVEMENTS}/pay-ccard`,paymentInformation).subscribe({
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
  
  async getMovements(dc_number: string): Promise<any> {
    const body = { dc_number }
    const data = await new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${_URL_MOVEMENTS}`,body).subscribe({
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
