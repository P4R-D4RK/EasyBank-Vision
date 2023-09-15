import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from './interfaces/user-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'EasyBank-Vision';
  activeNavBar: boolean = false;
  user: User = {
    first_name: '',
    last_name: '',
    user_number: '',
    credit_card: '',
  }
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeNavBar = !(event.url === '/' || event.url === '/login');
      }
    });
  }
}
