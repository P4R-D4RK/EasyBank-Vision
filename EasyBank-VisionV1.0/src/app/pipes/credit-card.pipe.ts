import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard'
})
export class CreditCardPipe implements PipeTransform {

  transform(value: string): unknown {
    return '***'+value.substring(12,16);
  }

}
