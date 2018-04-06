import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

@Injectable()
export class AuthProvider {

  constructor() {
    //console.log('Hello AuthProvider Provider');
  }

  // register user
  signupUser(email: string, password: string): Promise<void> {
    return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(newUser => {
              firebase
                    .database()
                    .ref(`/userProfile/${newUser.uid}/email`)
                    .set(email);
            })
            .catch(error => {
              console.error(error);
              throw new Error(error);
            });
  }

  // login user
  loginUser(email: string, password: string): Promise<User> {
    return firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
  }

  // reset password
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // logout user
  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
          .database()
          .ref(`/userProfile/${userId}`)
          .off();
    return firebase.auth().signOut();
  }

}
