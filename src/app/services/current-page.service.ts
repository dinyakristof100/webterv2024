import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentPageService {
  public currentPage: string = 'Kezdőlap'
  constructor() { }

  getCurrentPage(){
    return this.currentPage;
  }

  setCurrentPage(page: string){
    this.currentPage = page;
  }
}
