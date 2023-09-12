import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EasyBank-Vision';
  activeNavBar: boolean = false;
  
  constructor() {
  }

  ngOnInit(): void {
    let route = window.location.href.split('http://localhost:4200/')[1];
    if(route == '' || route == 'login') {
      this.activeNavBar = false;
    }
    else this.activeNavBar = true;
    
  }

  
}
