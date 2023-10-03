import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

//Material
import { ReactiveFormsModule } from '@angular/forms';
import { SaldosComponent } from './components/saldos/saldos.component';
import { AccountStatementsComponent } from './components/account-statements/account-statements.component';
import { CreditCardPipe } from './pipes/credit-card.pipe';
import { TransfersComponent } from './components/transfers/transfers.component';
import { ServicePaymentComponent } from './components/service-payment/service-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SaldosComponent,
    AccountStatementsComponent,
    CreditCardPipe,
    TransfersComponent,
    ServicePaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
