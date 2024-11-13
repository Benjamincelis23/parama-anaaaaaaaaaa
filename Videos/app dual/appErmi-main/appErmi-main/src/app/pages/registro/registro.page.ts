import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';     
  apellido: string = ''; 
  rut: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';
  loading: HTMLIonLoadingElement | undefined;

  constructor(
    private navCtrl: NavController, 
    private loadingCtrl: LoadingController, 
    private dbService: DatabaseService,
    private toastCtrl: ToastController 
  ) {}

  ngOnInit() {}

  async crearCuenta() {
    if (!this.nombre || !this.apellido || !this.rut || !this.telefono || !this.email || !this.password) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }

    this.loading = await this.loadingCtrl.create({
      message: 'Creando cuenta...',
    });
    await this.loading.present();

    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      telefono: this.telefono,
      email: this.email,
      password: this.password
    };

    try {
      await this.dbService.addUser(usuario);
      this.showToast(`Has sido registrado, tu usuario es: ${this.email}`);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      this.showToast('Error al crear la cuenta. Intenta nuevamente.');
    } finally {
      this.loading?.dismiss();
    }

    this.navCtrl.navigateBack('/login');
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
