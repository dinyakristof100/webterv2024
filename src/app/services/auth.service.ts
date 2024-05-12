import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Observable} from "rxjs";

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

  getUserEmail(): Observable<string | null> {
    return this.auth.user.pipe(
      map(user => user ? user.email : null)
    );
  }

  async updateEmail(newEmail: string): Promise<void> {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        await user.updateEmail(newEmail);
      } else {
        throw new Error('No user is currently logged in.');
      }
    } catch (error) {
      throw error;
    }
  }

}
