import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SafeUrl } from '@angular/platform-browser';
import { User } from 'src/app/interfaces/user.interface';
import { UserLogin } from 'src/app/interfaces/userLogin.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MovementsService } from 'src/app/services/movements.service';
import { UserService } from 'src/app/services/user.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.css'],
})
export class SaldosComponent implements  AfterViewInit, OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  user: UserLogin = {
    _id: '',
    first_name: '',
    last_name: '',
  };

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
    private _liveAnnouncer: LiveAnnouncer,
    private movementsService: MovementsService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  async ngAfterViewInit(): Promise<any> {
    this.dataSource.sort = this.sort;
  }

  async ngOnInit(): Promise<any> {
    this.user = this.getUser()!;
    this.userData = await this.userService.getUserData(this.user._id);
    console.log(this.userData.debit_card.dc_number)
    const movements = await this.movementsService.getMovements(
      this.userData.debit_card.dc_number
    );
    console.log(movements);
  }

  getUser() {
    return this.authService.getUser();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  /*
  //HTML
  const btnTodos = document.getElementById("btnTodos") as HTMLButtonElement;
  const btnIngresos = document.getElementById("btnIngresos") as HTMLButtonElement;
  const btnEgresos = document.getElementById("btnEgresos") as HTMLButtonElement;
  const balanceDiv = document.getElementById("balanceDiv");
  const smallImage = document.getElementById("smallImage") as HTMLImageElement;


  
  // Botnoes para la página
  btnTodos.addEventListener("click", () => {
      console.log("Todos presionado");
  });

  btnIngresos.addEventListener("click", () => {
      console.log("Ingresos presionado");
  });

  btnEgresos.addEventListener("click", () => {
      console.log("Egresos presionado");
  });

  balanceDiv.addEventListener("click", () => {
      console.log("Saldo actual presionado");
  });

  smallImage.addEventListener("click", () => {
      console.log("Imagen pequeña presionada");
  });
  */
}
