import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';  // Importa el controlador de navegación
import { DatabaseService } from 'src/app/services/database.service';  // Asegúrate de que esta importación sea correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUsuario: string = "";  // Correo electrónico del usuario
  loginContrasena: string = "";
  mensajeError: string = "";  // Variable para mostrar un mensaje de error

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

  // Método que redirige a la página de registro
  navigateToRegister() {
    this.navCtrl.navigateForward('/registro');
  }
}
