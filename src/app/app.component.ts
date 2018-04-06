import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase, { Unsubscribe } from 'firebase';
import { firebaseConfig } from '../app/credentials';
//import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    platform.ready().then(() => {

      firebase.initializeApp(firebaseConfig);
      const unsubscribe: Unsubscribe = firebase
        .auth()
        .onAuthStateChanged(user => {
          // cek user logged in atau tidak
          if (!user) {
            this.rootPage = 'LoginPage';
            unsubscribe();
          } else {
            this.rootPage = HomePage;
            unsubscribe();
          }
        });

      statusBar.styleDefault();
      splashScreen.hide();

      // OneSignal code here
      /*
      var notificationOpenedCallback = function (jsonData) {
        alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
  
      window["plugins"].OneSignal
        .startInit("6ed21a71-614e-4270-8daf-f528e75d4021", "675230572149")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
      */
    });
  }
}

