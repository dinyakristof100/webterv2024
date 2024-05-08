import { Component } from '@angular/core';
import {BackgroundColorService} from "../../services/background-color.service";
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButton} from "@angular/material/button";
import { AppDate } from "../../shared/model/AppDate"
import {FormsModule} from "@angular/forms";
import {DatePickerService} from "../../services/date-picker.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  imports: [
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatButton, FormsModule
  ],
  providers: [provideNativeDateAdapter()],
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
  selectedDate: Date | null = null;

  constructor(
    private backgroundService: BackgroundColorService,
    private datePickerService: DatePickerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.backgroundService.setBackgroundColor('#ccffe6');
  }

  sendDate() {
    if (this.selectedDate) {
      const appDate: AppDate = {
        id: '',
        year: this.selectedDate.getFullYear().toString(),
        month: (this.selectedDate.getMonth() + 1).toString(),
        day: this.selectedDate.getDate().toString()
      };
      this.datePickerService.create(appDate).then(() => {
        console.log('Időpontfoglalás sikeresen elmentve!');
      }).then(() => {
        this.snackBar.open('Időpontfoglalás sikeresen elmentve!', 'Vissza a főoldalra', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'] // Optional: add custom CSS class for styling
        }).onAction().subscribe(() => {
          this.router.navigate(['/main']);
        });
      }).catch(error => {
        console.error('Időpontfoglalás sikertelen:', error);
        this.snackBar.open('Sikertelen időpontfoglalás', 'Close', {
          duration: 3000
        });
      });
    } else {
      console.log('Nincs kiválasztva dátum');
    }
  }
}
