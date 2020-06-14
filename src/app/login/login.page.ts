/**
* Ionic 4 Firebase Email Auth
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Component, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonSlides} from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  username;
  password: string = '';
  error: string = '';
  image;
  constructor(private fireauth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController) {
  }
  @ViewChild(IonSlides) slides:IonSlides;

  slideOpts = {
    slidesPerView: 1,
  };

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  login() {
    this.fireauth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          this.router.navigate(['/app/tab1']);
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        this.error = err.message;
      });
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  signup() {
    this.fireauth.createUserWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          this.updateProfile();
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        this.error = err.message;
      });
  }

  updateProfile() {
    this.fireauth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        user.updateProfile({
          displayName: this.username,
          photoURL: `https://picsum.photos/id/${this.image}/200/200`
        })
          .then(() => {
            this.router.navigateByUrl('/tabs/tab1');
          })
      }
    })
  }

  next(){
    this.slides.slideNext();
  }

  previous(){
    this.slides.slidePrev();
  }

  forgto(){
    this.slides.slideTo(2)
  }

  

}
