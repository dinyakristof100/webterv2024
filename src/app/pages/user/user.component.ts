import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/model/User'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  emailForm: FormGroup;
  userEmail: any;
  user: any;

  constructor(private authService: AuthService) {
    this.authService.getUserEmail().subscribe(email => {
      this.userEmail = email;
    });

    this.emailForm = new FormGroup({
      newEmail: new FormControl(this.userEmail, [Validators.required, Validators.email])
    });
  }

  updateEmail() {
    const newEmail = this.emailForm.get('newEmail')?.value;
    if (newEmail) {
      this.authService.updateEmail(newEmail).then(() => {
        console.log('Email address updated successfully.');
      }).catch(error => {
        console.error('Error updating email:', error);
      });
    }
  }
}
