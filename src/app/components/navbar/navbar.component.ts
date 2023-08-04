import {Component, Input, OnInit} from '@angular/core';
import {Link} from "../../shared/models/link";
import {UserRole} from "../../shared/enums/userRole";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isConnected: boolean = false;
  userRole: UserRole | undefined;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(){
    this.authService.isConnected$.subscribe((isConnected) => {
      this.isConnected = isConnected;
      this.userRole = this.authService.user?.role;
    })
  }


  navLinks: Link[] = [
    { title: 'Acceuil', url: '/home', isVisible: false, isAccessible: true },
    {
      title: 'Tournois',
      url: '/tournament',
      children: [
        { title: 'Index', url: '/tournament/index' },
        { title: 'Nouveau', url: '/tournament/add' }
      ],
      isVisible: false,
      isAccessible: true
    },
    { title: 'Nouveau membre', url: '/member', isVisible: false, isAccessible: this.authService.user?.role === UserRole.A },
    { title: 'login', url: '/login', isVisible: false, isAccessible: true }
  ];


  toggleVisible(link: Link): void {
    let currentState = link.isVisible;
    this.navLinks.forEach((l) => (l.isVisible = false));

    if (this.userRole !== UserRole.A) {
      link.isVisible = false;
    } else {
      link.isVisible = !currentState;
    }
  }

}
