import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from 'src/app/interfaces/user.interface';
import { UserLogin } from 'src/app/interfaces/userLogin.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MovementsService } from 'src/app/services/movements.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-statements',
  templateUrl: './account-statements.component.html',
  styleUrls: ['./account-statements.component.css'],
})
export class AccountStatementsComponent implements OnInit {
  mode: boolean = false;
  cards: any[] = [];
  selectedCard: any = '';
  user: UserLogin = {
    _id: '',
    first_name: '',
    last_name: '',
  };
  accountStatements: any[] = [1, 1, 1, 1, 1];
  now = new Date();
  months: any[] = [];

  userData: User = {
    user_number: '',
    first_name: '',
    last_name: '',
    debit_card: {
      dc_number: '',
      dc_avaliable_balance: 0,
    },
    credit_cards: [],
    password: '',
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private movementsService: MovementsService
  ) {}

  async ngOnInit(): Promise<any> {
    this.setMonths();
    this.user = this.getUser()!;
    const userData = await this.userService.getUserData(this.user._id);
    // console.log(userData);
    this.cards.push({
      value: userData.debit_card,
      viewValue:
        'Tarjeta de débito - ' + userData.debit_card.dc_number.substring(12),
    });
    userData.credit_cards?.forEach((credit_card: any) =>
      this.cards.push({
        value: credit_card.cc_number,
        viewValue:
          'Tarjeta de crédito - ' + credit_card.cc_number.substring(12),
      })
    );
  }

  getUser() {
    return this.authService.getUser();
  }

  setMonths() {
    if (this.selectedCard != undefined) {
      for (let i = 0; i < 5; i++) {
        let mesActual = this.now.getMonth();
        let nombreMes = new Intl.DateTimeFormat('es', { month: 'long' }).format(
          this.now
        );
        let numeroMes = this.now.getMonth();
        this.months.push({ name: nombreMes, number: numeroMes });
        this.now.setMonth(mesActual - 1);
      }
    }
  }

  async generatePDF(month: any) {
    this.userData = await this.userService.getUserData(this.user._id);
    // console.log(this.userData.debit_card.dc_number);
    const movements = await this.movementsService.getMovements(
      this.selectedCard.dc_number
    );

    let movementsMonth: any[] = movements['movements'].filter(
      (element: any) => {
        const elementDate = new Date(element.date);
        return (
          elementDate.getFullYear() === this.now.getFullYear() &&
          elementDate.getMonth() === month.number
        );
      }
    );

    let movementsFound: any[] = [];
    movementsMonth.forEach((element: any) => {
      let dateUTC = new Date(element.date);
      movementsFound.push([
        dateUTC.toLocaleDateString('es-MX', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'America/Mexico_City',
        }),
        element.paymentReason,
        '***' + element.destination.substring(12, 16),
        this.currencyPipe(element.amount),
      ]);
    });

    if (movementsMonth.length == 0) {
      Swal.fire({
        background: '#333333',
        color: '#FFFFFF',
        title: 'Oops...',
        text: 'No hay movimientos en este mes',
        icon: 'warning',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      var doc = new jsPDF();
      let card: string = '';
      card = this.selectedCard.dc_number ? 'Tarjeta de débito EasyBank': 'Tarjeta de crédito SPACE';
      // console.log(movementsFound);
      // Agregar la tabla al documento
      doc.setFont('Helvetica', 'Bold');
      doc.text(
        'Estado de cuenta - ' +
          this.capitalizeString(month.name) +
          ', ' +
          this.now.getFullYear(),
        105,
        15,
        { align: 'center' }
      );
      doc.setFont('Helvetica', 'Bold');
      doc.setFontSize(12);
      doc.text('Nombre: ', 20, 30);
      doc.setFont('Helvetica', '');
      doc.text(this.user.first_name + ' '+ this.user.last_name, 40, 30);
      doc.setFont('Helvetica', 'Bold');
      doc.text('Número de tarjeta: ', 20, 40);
      doc.setFont('Helvetica', '');
      doc.text(this.selectedCard.dc_number, 60, 40);
      doc.setFont('Helvetica', 'Bold');
      doc.text(card, 20, 50);
      autoTable(doc, {
        head: [['Fecha', 'Razón de pago', 'Destino', 'Monto']],
        body: movementsFound,
        startY: 60, // Posición inicial en el eje Y
        margin: { horizontal: 10, top: 10 },
        styles: {
          overflow: 'linebreak',
          textColor: 0,
        },
        headStyles: {
          fillColor: [117, 37, 139],
          textColor: 255,
          fontStyle: 'bold',
        },
        bodyStyles: {
          fillColor: [245, 245, 245],
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
        },
      });
      doc.save('Estado de cuenta.pdf');
    }
  }

  currencyPipe(
    value: number,
    currencyCode: string = 'USD',
    locale: string = 'en-US'
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
  }

  capitalizeString(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  change() {
    this.mode = !this.mode;
  }
}
