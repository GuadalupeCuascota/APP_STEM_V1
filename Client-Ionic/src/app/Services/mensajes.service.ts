import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {AlertController}  from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  constructor(
    private toastController:ToastController,
    private alertController: AlertController) { }
    
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentToast(message: string)
  {
    if(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  }

  
}
