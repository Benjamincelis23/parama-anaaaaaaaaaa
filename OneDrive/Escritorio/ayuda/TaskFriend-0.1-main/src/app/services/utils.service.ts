import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { citasmedicas } from '../models/citasmedicas.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  //==========Loading==========
  async presentLoading(opts?: any) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

  //==========LocalStorage==========
  setElementInLocalStorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element));
  }

  getElementFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  async presentToast(opts: any) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  routerLink(url: string) {
    return this.router.navigate([url]);
  }

  //==========Alerta==========
  async presentAlert(opts: any) {
    const alert = await this.alertController.create(opts);
    await alert.present();
  }

  //==========Modal==========
  async presentModal(opts: any) {
    const modal = await this.modalController.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      return data;
    }
  }

  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }

  // Calcula el porcentaje de elementos completados en las citas
  getPercentage(appointment: citasmedicas) {
    const completedItems = appointment.items.filter(item => item.completed).length;
    const totalItems = appointment.items.length;
    const percentage = (100 / totalItems) * completedItems;

    return parseInt(percentage.toString());
  }
}
