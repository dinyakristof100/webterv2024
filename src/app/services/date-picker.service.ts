import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { AppDate } from "../shared/model/AppDate"

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  collectionName:string  = 'Date';
  constructor(private afs: AngularFirestore) { }

  create(date: AppDate){
    date.id = this.afs.createId();
    return this.afs.collection<AppDate>(this.collectionName).doc(date.id).set(date);
  }

  getAll(){
    return this.afs.collection<AppDate>(this.collectionName).valueChanges();
  }

  update(date: AppDate) {
    return this.afs.collection<AppDate>(this.collectionName).doc(date.id).set(date);
  }

  delete(id: string) {
    return this.afs.collection<AppDate>(this.collectionName).doc(id).delete();
  }
}
