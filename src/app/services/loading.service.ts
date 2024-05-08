import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subscriber, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private router: Router) { }

  loadingWithPromise(email: string, password: string) : Promise<boolean> {
    return new Promise((resolve,reject) => {
      setTimeout(() =>{
        if(email === 'test@test.com' && password === 'testPassword'){
          resolve(true);
        }else{
          reject(false)
        }
      },1000);
    });
  }

  loadingWithObservable(email:string, password: string): Observable<boolean>{
    return new Observable((subscriber: Subscriber<boolean>) => {
      let i =0;
      const interval = window.setInterval(()=>{
        i++;
        //subscriber.next(i);
        if(i===3){
          if(email === 'test@gmail.com' && password === 'testPw'){
            subscriber.next(true);
            subscriber.complete();
          }else{
            subscriber.error(false);
          }
        }
      },500)
    });
  }
}
