import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  async login(email: string, password: string) {
    try {
      return await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string) {
    try {
      return await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      throw error;
    }
  }

  getUser() {
    return this.auth.user;
  }

}
