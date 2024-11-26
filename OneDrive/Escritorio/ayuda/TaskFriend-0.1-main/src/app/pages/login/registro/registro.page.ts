import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(),
    rut: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?:\d{1,2}\.\d{3}\.\d{3}-[\dkK])$/) // Validación RUT chileno
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{9}$/) // Validación número de teléfono chileno (9 dígitos)
    ])
  });

  constructor(
    private firebaseSVc: FirebaseService,
    private utilsSvc: UtilsService 
  ) { }

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  // Validación de la contraseña de confirmación
  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password)
    ]);
    this.form.controls.confirmPassword.updateValueAndValidity();
  }

  // Función para manejar el registro de usuario
  submit() {
    if (this.form.valid) {
      this.utilsSvc.presentLoading({ message: 'Registrando...' });

      // Realizamos el registro con Firebase
      this.firebaseSVc.signUp(this.form.value as user).then(async res => {
        console.log('Usuario creado:', res);

        // Actualizamos el nombre de usuario
        await this.firebaseSVc.updateUser({ displayName: this.form.value.name });

        // Construimos el objeto user con la información de Firebase y la del formulario
        let user: user = {
          uid: res.user.uid,
          name: res.user.displayName || this.form.value.name,
          email: res.user.email || this.form.value.email,
          rut: this.form.value.rut,
          phone: this.form.value.phone,
          password: ''  // Aquí añades el password de alguna forma, por ejemplo, como un string vacío
        };
        
        // Guardamos el objeto user en localStorage
        this.utilsSvc.setElementInLocalStorage('user', user);

        // Redirigimos al usuario a la página principal
        this.utilsSvc.routerLink('/inicio/home');
        this.utilsSvc.dismissLoading();

        // Presentamos un mensaje de éxito
        this.utilsSvc.presentToast({
          message: `¡Bienvenido a TaskFriend! ${user.name}`,
          duration: 1500,
          color: 'success',
          icon: 'person-outline'
        });

        // Limpiamos el formulario
        this.form.reset();

      }, error => {
        // En caso de error, mostramos un mensaje
        this.utilsSvc.presentToast({
          message: error.message || 'Ha ocurrido un error al registrar el usuario.',
          duration: 5000,
          color: 'warning',
          icon: 'alert-circle-outline'
        });
        this.utilsSvc.dismissLoading();
      });
    }
  }
}
