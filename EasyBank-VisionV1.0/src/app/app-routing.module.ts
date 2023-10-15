import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SaldosComponent } from './components/saldos/saldos.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { AccountStatementsComponent } from './components/account-statements/account-statements.component';
import { ServicePaymentComponent } from './components/service-payment/service-payment.component';
import { InvestmentComponent } from './components/investment/investment.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'saldos', component: SaldosComponent},
  { path: 'transfers', component: TransfersComponent},
  { path: 'account-statements', component: AccountStatementsComponent},
  { path: 'service-payment', component: ServicePaymentComponent},
  { path: 'investment', component: InvestmentComponent},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
