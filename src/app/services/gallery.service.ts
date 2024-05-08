import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Image} from "../shared/model/Image";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {


  collectionName = 'Images'
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  loadImageMeta(): Observable<Array<Image>>{
    return this.afs.collection<Image>(this.collectionName).valueChanges();
  }
  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

}
