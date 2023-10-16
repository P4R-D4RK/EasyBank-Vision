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

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.css'],
})
export class SaldosComponent implements AfterViewInit, OnInit {
  mode: boolean = false;
  movements: any[] = [];
  displayedColumns: string[] = [
    'date',
    'paymentReason',
    'origin',
    'destination',
    'amount',
  ];
  dataSource = new MatTableDataSource(this.movements);
  filter: string = 'All';

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
    console.log(this.userData.debit_card.dc_number);
    const movements = await this.movementsService.getMovements(
      this.userData.debit_card.dc_number
    );
    this.movements = movements['movements'];
    this.dataSource = new MatTableDataSource(this.movements);
    this.dataSource.sort = this.sort;
    console.log(movements['movements']);
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

  filterMovements(mode: string) {
    this.filter = mode;
    let filteredMovements: any[] = [];
    if (mode == 'All') {
      this.dataSource = new MatTableDataSource(this.movements);
      this.dataSource.sort = this.sort;
    } else {
      if (mode == 'Incomes') {
        filteredMovements = this.movements.filter(
          (movement) => movement.type == 'Ingreso'
        );
      } else if (mode == 'Outcomes') {
        filteredMovements = this.movements.filter(
          (movement) => movement.type == 'Egreso'
        );
      }
      this.dataSource = new MatTableDataSource(filteredMovements);
      this.dataSource.sort = this.sort;
    }
  }

  change() {
    this.mode = !this.mode;
  }
}
