import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert, 
          AlertController, 
          Loading, 
          LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder
    ) {
      // panggil validator
      this.loginForm = formBuilder.group({
        email: [
          '',
          Validators.compose([Validators.required, EmailValidator.isValid])
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)])
        ]
      });
    }

    // panggil signup
    goToSignup(): void{
      this.navCtrl.push('SignupPage');
    }

    // panggil reset password
    goToResetPassword(): void{
      this.navCtrl.push('ResetPasswordPage');
    }

    // panggil user login
    loginUser(){
      // cek isi email dan password harus valid
      if(!this.loginForm.valid){
        console.log(`Form belum valid : ${this.loginForm.value}`);
      }
      else{
        // proses login & cek dari firebase
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        this.authProvider.loginUser(email, password).then(
          authData => {                           // resolve
            this.loading.dismiss().then(() => {
              this.navCtrl.setRoot(HomePage);
            });
          },
          error => {                              // reject
            this.loading.dismiss().then(() => {
              const alert: Alert = this.alertCtrl.create({
                message: error.message,
                buttons: [{ text: 'OK', role: 'cancel'}]
              });
              alert.present();
            });
          }
        );
        this.loading = this.loadingCtrl.create();
        this.loading.present();
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
