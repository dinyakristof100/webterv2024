import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from "../../services/loading.service";
import { BackgroundColorService } from "../../services/background-color.service";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from '@angular/common';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatInputModule,
    MatIconModule,
    MatButton,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  loading: boolean = false;
  loadingSubscription?: Subscription;
  email = this.loginForm.get('email')?.value;
  password = this.loginForm.get('password')?.value;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private backgroundService: BackgroundColorService,
    private authService: AuthService
  ) {
    this.backgroundService.setBackgroundColor('#90EE90');
  }

  async login() {
    this.email = this.loginForm.get('email')?.value;
    this.password = this.loginForm.get('password')?.value;
    this.authService.login(this.email, this.password).then(cred=>{
      this.router.navigateByUrl('/');
      this.loading = false;
    }).catch(error =>{
      console.error(error);
      this.loading = false;
    });

  }
  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe(); // Avoid memory leaks
  }
}
