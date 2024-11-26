import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private firebaseSVc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.utilsSvc.presentLoading({ message: 'Autenticando...' });
      this.firebaseSVc.login(this.form.value as user).then(async res => {
        console.log(res);

        let user: user = {
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
          password: '',
          rut: '',  // El RUT podría ser obtenido de otra fuente o base de datos si es necesario
          phone: '', // El teléfono también podría ser consultado después de iniciar sesión
        };

        this.utilsSvc.setElementInLocalStorage('user', user);
        this.utilsSvc.routerLink('/inicio/home');

        this.utilsSvc.dismissLoading();

        this.utilsSvc.presentToast({
          message: '¡Bienvenido a TaskFriend!',
          duration: 1500,
          color: 'success',
          icon: 'person-outline'
        });

        this.form.reset();
      }, error => {
        this.utilsSvc.presentToast({
          message: error,
          duration: 5000,
          color: 'warning',
          icon: 'alert-circle-outline'
        });
        this.utilsSvc.dismissLoading();
      });
    }
  }
}
