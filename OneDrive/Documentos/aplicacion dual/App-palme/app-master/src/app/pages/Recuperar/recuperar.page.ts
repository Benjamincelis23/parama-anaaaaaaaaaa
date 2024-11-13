import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuario: string = '';  // Agregado para el campo de usuario
  correoElectronico: string = '';
  correoConfirmacion: string = '';
  mensajeErrorUsuario: string = '';  // Agregado para el mensaje de error del usuario
  mensajeErrorCorreo: string = '';
  mensajeErrorConfirmacion: string = '';

  constructor() { }

  ngOnInit() { }

  validarUsuario() {
    if (!this.usuario) {
      this.mensajeErrorUsuario = 'Ingrese un usuario';
    } else {
      this.mensajeErrorUsuario = '';
    }
  }

  validarCorreo() {
    if (!this.correoElectronico) {
      this.mensajeErrorCorreo = 'Ingrese un correo electrónico';
    } else if (!this.correoElectronico.includes('@')) {
      this.mensajeErrorCorreo = 'El correo electrónico debe contener un "@"';
    } else {
      this.mensajeErrorCorreo = '';
    }
  }

  validarConfirmacion() {
    if (this.correoConfirmacion !== this.correoElectronico) {
      this.mensajeErrorConfirmacion = 'Los correos electrónicos no coinciden';
    } else {
      this.mensajeErrorConfirmacion = '';
    }
  }

  enviarEnlace() {
    this.validarUsuario();  // Validar usuario antes de enviar
    this.validarCorreo();
    this.validarConfirmacion();
    
    if (!this.mensajeErrorUsuario && !this.mensajeErrorCorreo && !this.mensajeErrorConfirmacion) {
      console.log('Enviando enlace de recuperación a: ', this.correoElectronico);
      // Aquí puedes agregar la lógica para enviar el enlace de recuperación
    }
  }
}
