import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUsuario: string = "";
  loginContrasena: string = "";
  mensajeError: string = "";

  constructor(private navCtrl: NavController, private dbService: DatabaseService) {}

  ngOnInit() {}

  async ValidarCredenciales() {
    const usuario = await this.dbService.validateUser(this.loginUsuario, this.loginContrasena);

    if (usuario) {  
      localStorage.setItem('usuarioActual', JSON.stringify({
        nombre: usuario.nombre,
        apellido: usuario.apellido
      }));
      this.navCtrl.navigateForward('/inicio');
    } else {
      this.mensajeError = 'Usuario o contraseña incorrectos';
    }
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/registro');
  }
}
