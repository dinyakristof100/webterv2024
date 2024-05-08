import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackgroundColorService {
  private backgroundColor: string = 'white';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setBackgroundColor(color: string) {
    this.backgroundColor = color;
    if (isPlatformBrowser(this.platformId)) {
      // Kliensoldali kód csak akkor fusson, ha a kód a böngészőben fut
      document.body.style.backgroundColor = color;
    }
  }

  getBackgroundColor(): string {
    return this.backgroundColor;
  }
}
