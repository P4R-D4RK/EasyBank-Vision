import { Component } from '@angular/core';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.css']
})

export class SaldosComponent {
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
}
