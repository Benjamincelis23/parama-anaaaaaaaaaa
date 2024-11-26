import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { user } from '../models/user.model';
import { getAuth, updateProfile } from 'firebase/auth';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilsSvc: UtilsService
  ) { }

  //======== Autenticación ========
  login(user: user) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
      .catch(error => {
        console.error("Login error: ", error);
        throw new Error("Error de inicio de sesión: " + error.message);
      });
  }

  signUp(user: user) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(error => {
        console.error("Sign-up error: ", error);
        throw new Error("Error de registro: " + error.message);
      });
  }

  updateUser(user: { displayName: string; photoURL?: string }) {
    const auth = getAuth();
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: user.displayName,
        photoURL: user.photoURL
      });
    } else {
      throw new Error("No user is currently signed in.");
    }
  }

  getAuthState() {
    return this.auth.authState;
  }

  async signOut() {
    await this.auth.signOut();
    this.utilsSvc.routerLink('/login');
    localStorage.removeItem('user');
  }

  //======== Firestore base de datos ========
  getSubcollection(path: string, subcollectionName: string) {
    return this.db.doc(path).collection(subcollectionName).valueChanges({ idField: 'id' });
  }

  addToSubcollection(path: string, subcollectionName: string, object: any) {
    return this.db.doc(path).collection(subcollectionName).add(object);
  }

  updateDocument(path: string, object: any) {
    return this.db.doc(path).update(object);
  }

  deleteDocument(path: string) {
    return this.db.doc(path).delete();
  }
}
