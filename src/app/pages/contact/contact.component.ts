import { Component } from '@angular/core';
import {BackgroundColorService} from "../../services/background-color.service";
import {MatIcon} from "@angular/material/icon";
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  imports: [
    MatIcon, DateFormatPipe
  ],
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  currentDate = new Date();
  constructor(private backgroundService: BackgroundColorService) {
    this.backgroundService.setBackgroundColor('lightblue');
  }
}
