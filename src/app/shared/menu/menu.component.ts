import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {navItems} from "../constants/constants";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {CurrentPageService} from "../../services/current-page.service";
import {BackgroundColorService} from "../../services/background-color.service";
import {AuthService} from "../../services/auth.service";
import firebase from "firebase/compat";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatSidenav,
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    MatSidenavModule,
    NgIf
  ],
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  //@Output() isLoggedin = new EventEmitter<string>();
  loggedInUser?: firebase.User | null;
  protected readonly navItems = navItems;

  constructor(
    protected currentPageService: CurrentPageService,
    protected backgroundColorService: BackgroundColorService,
    private authService: AuthService,
    ) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user =>{
      //console.log("currentUser: ",user);
      this.loggedInUser = user;
    }, error => {
      console.log(error);
    });
    }

  toggleMenu() {
    const menu = document.getElementById('menu');
    if(menu!=null)
      menu.classList.toggle('active');
  }

  setCurrentPage(page: string) {
    this.currentPageService.setCurrentPage(page);
  }

  logout() {
    this.authService.logout().then(()=>{
      console.log('Logged out succesfully.');
      this.loggedInUser = null;
    }).catch(err =>{
      console.error(err);
    });
  }

  isUserLoggedIn(): boolean{
    return this.loggedInUser != null;
  }
}

