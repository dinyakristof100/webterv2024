import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "./shared/menu/menu.component";
import {MainComponent} from "./pages/main/main.component";
import {DatePickerComponent} from "./pages/date-picker/date-picker.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {GalleryComponent} from "./pages/gallery/gallery.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import { BackgroundColorService } from './services/background-color.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NgForOf} from "@angular/common";
import firebase from "firebase/compat";
import {AuthService} from "./services/auth.service";
import {navItems} from "./shared/constants/constants";
import {CurrentPageService} from "./services/current-page.service";



@Component({
  imports: [
    MenuComponent,
    MainComponent,
    DatePickerComponent,
    ContactComponent,
    GalleryComponent,
    RouterOutlet,
    MatToolbarModule, MatButtonModule, MatIconModule, MatListItem, MatNavList, MatSidenav, MatSidenavContainer, MatSidenavContent, NgForOf, RouterLink,
  ],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  title = 'Elektronikai';
  backgroundColor: string = '';
  loggedInUser?: firebase.User | null;
  protected readonly navItems = navItems;

  constructor(
    protected backgroundColorService: BackgroundColorService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.backgroundColor  = this.backgroundColorService.getBackgroundColor();

    this.authService.getUser().subscribe(user =>{
      this.loggedInUser = user;
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("user",JSON.stringify(this.loggedInUser))
      }

    }, error => {
      console.log(error);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("user",JSON.stringify('null'))
      }
    });
  }


}
