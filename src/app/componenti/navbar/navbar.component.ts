import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService ){}
  isUserLoggedIn() : boolean{
    return this.authService.isLoggedIn; 
  }
  
  isMobileView = false;  
  isNavbarScrolled: boolean = false;
  isDarkTheme: boolean = true;
  
  
  @HostListener('window:resize', ['$event'])
  ngOnInit(event: Event) {
    this.checkScreenSize(); 
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isNavbarScrolled = window.scrollY > 80;
    this.isDarkTheme = !this.isNavbarScrolled;
  }
  
  checkScreenSize() {
    this.isMobileView = window.innerWidth < 768; // Imposta la larghezza a 768 px in base alle necessità del tuo design responsivo  
  }


  
}
