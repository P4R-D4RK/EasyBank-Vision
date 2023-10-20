import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SaldosComponent } from './components/saldos/saldos.component';
import { AccountStatementsComponent } from './components/account-statements/account-statements.component';
import { CreditCardPipe } from './pipes/credit-card.pipe';
import { TransfersComponent } from './components/transfers/transfers.component';
import { ServicePaymentComponent } from './components/service-payment/service-payment.component';
import { InvestmentComponent } from './components/investment/investment.component';
import { PayCcardComponent } from './components/pay-ccard/pay-ccard.component';

//Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { NewInvestmentComponent } from './components/new-investment/new-investment.component';

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
    ServicePaymentComponent,
    InvestmentComponent,
    PayCcardComponent,
    NewInvestmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
