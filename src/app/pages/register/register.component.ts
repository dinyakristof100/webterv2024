import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BackgroundColorService } from "../../services/background-color.service";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import { User } from "../../shared/model/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButton,
    MatProgressSpinner
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordAgain: new FormControl('', Validators.required),
  });
  loading: boolean = false;

  constructor(
    private backgroundService: BackgroundColorService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.backgroundService.setBackgroundColor('#ADD8E6');
  }

  onSubmit() {
    const password = this.form.get('password')?.value;
    const passwordAgain = this.form.get('passwordAgain')?.value;

    if (this.form.valid && password === passwordAgain) {
      this.authService.register(this.form.get('email')?.value, this.form.get('password')?.value)
        .then(cred =>{
          console.log(cred);

          const user: User = {
            id: cred.user?.uid as string,
            email: this.form.get('email')?.value,
            username: this.form.get('email')?.value.split('@')[0],
            name:{
              firstname: this.form.get('firstName')?.value,
              lastname: this.form.get('lastName')?.value
            }
          };

          this.userService.create(user).then(_ =>{
            console.log('User added succesfully.');
          }).catch(error =>{
            console.error(error)
          })


        }).catch(error =>{
          console.log(error);
      });
    }
  }
}
