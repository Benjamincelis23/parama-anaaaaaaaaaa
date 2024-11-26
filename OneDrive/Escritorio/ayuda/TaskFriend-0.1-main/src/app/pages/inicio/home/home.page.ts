import { Component, OnInit } from '@angular/core';
import { citasmedicas } from 'src/app/models/citasmedicas.model'; // Cambiado de Task a Appointment
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AppointmentComponent } from 'src/app/compartido/componentes/appointment/appointment.component'; // Ya estaba cambiado correctamente
import { user } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user = {} as user;
  appointments: citasmedicas[] = []; // Cambiado Task[] a Appointment[]
  loading: boolean = false;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAppointments(); // Mantener getAppointments como está
    this.getUser();
  }

  getUser() {
    return this.user = this.utilsSvc.getElementFromLocalStorage('user');
  }

  async addOrUpdateAppointment(appointment?: citasmedicas) { // Cambiado Task a Appointment
    let res = await this.utilsSvc.presentModal({
      component: AppointmentComponent, // Mantener AppointmentComponent
      componentProps: { appointment },
      cssClass: 'add-update-modal'
    })

    if (res && res.success) {
      this.getAppointments(); // Mantener getAppointments como está
    }
  }

  getAppointments() { // Mantener como está
    let user: user = this.utilsSvc.getElementFromLocalStorage('user');
    let path = `users/${user.uid}`;

    this.loading = true;

    let sub = this.firebaseSvc.getSubcollection(path, 'appointments').subscribe({ // Mantener appointments como está
      next: (res: citasmedicas[]) => { // Cambiado Task[] a Appointment[]
        console.log(res);
        this.appointments = res; // Mantener appointments como está
        sub.unsubscribe();
        this.loading = false;
      }
    })
  }

  confirmDeleteAppointment(appointment: citasmedicas) { // Cambiado Task a Appointment
    this.utilsSvc.presentAlert({
      header: 'Eliminar Cita',
      message: '¿Quieres eliminar esta cita?',
      mode: 'md',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Sí, eliminar',
          handler: () => {
            this.deleteAppointment(appointment); // Mantener como está
          }
        }
      ]
    })
  }

  deleteAppointment(appointment: citasmedicas) { // Cambiado Task a Appointment
    let path = `users/${this.user.uid}/appointments/${appointment.id}`; // Mantener appointments como está

    this.utilsSvc.presentLoading({
      duration: 1500
    });

    this.firebaseSvc.deleteDocument(path).then(res => {

      this.utilsSvc.presentToast({
        message: 'Cita eliminada exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500
      })

      this.getAppointments(); // Mantener como está
      this.utilsSvc.dismissLoading()
    }, error => {

      this.utilsSvc.presentToast({
        message: error,
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      })

      this.utilsSvc.dismissLoading()
    })
  }

  // Método para ver la cita
  viewAppointment(appointment: citasmedicas) {
    console.log('Viendo cita:', appointment);
    // Aquí puedes agregar la lógica para mostrar los detalles de la cita, por ejemplo, abrir un modal o navegar a otra página.
  }

  // Método para confirmar la cancelación de la cita
  confirmCancelAppointment(appointment: citasmedicas) {
    this.utilsSvc.presentAlert({
      header: 'Cancelar Cita',
      message: '¿Estás seguro de que deseas cancelar esta cita?',
      mode: 'md',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, cancelar',
          handler: () => {
            this.deleteAppointment(appointment);  // Llamar al método para eliminar la cita
          }
        }
      ]
    });
  }

}
