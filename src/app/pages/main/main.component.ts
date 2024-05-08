import { Component } from '@angular/core';
import {BackgroundColorService} from "../../services/background-color.service";

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private backgroundService: BackgroundColorService) {
    this.backgroundService.setBackgroundColor('#ffeee6');
  }
}
