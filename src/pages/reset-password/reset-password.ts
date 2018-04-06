import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {

    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      console.log(`Form belum valid : ${this.resetPasswordForm.value}`);
    } else {
      const email: string = this.resetPasswordForm.value.email;
      this.authProvider.resetPassword(email).then(
        user => {         // resolve
          const alert: Alert = this.alertCtrl.create({
            message: 'Cek email untuk reset password!',
            buttons: [{
              text: 'OK',
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
          });
          alert.present();
        },
        error => {          // reject
          const errorAlert = this.alertCtrl.create({
            message: error.message,
            buttons: [{
              text: 'OK',
              role: 'cancel'
            }]
          });
          errorAlert.present();
        }
      );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
