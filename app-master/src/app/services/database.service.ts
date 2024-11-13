import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements CanActivate {
  private dbInstance: SQLiteObject | undefined;

  constructor(private router: Router, private sqlite: SQLite) {
    this.init();
  }

  // Inicializar la base de datos SQLite
  async init() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'usuarios.db',
        location: 'default'
      });
      await this.createTable();
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  // Crear la tabla de usuarios
  async createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      apellido TEXT,
      rut TEXT,
      telefono TEXT,
      email TEXT UNIQUE,
      password TEXT
    )`;
    try {
      await this.dbInstance?.executeSql(sql, []);
    } catch (error) {
      console.error('Error al crear la tabla de usuarios:', error);
    }
  }

  // Añadir un nuevo usuario a la base de datos
  async addUser(usuario: any): Promise<void> {
    const sql = `INSERT INTO usuarios (nombre, apellido, rut, telefono, email, password) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [usuario.nombre, usuario.apellido, usuario.rut, usuario.telefono, usuario.email, usuario.password];
    try {
      await this.dbInstance?.executeSql(sql, params);
      console.log('Usuario añadido con éxito:', usuario);
    } catch (error) {
      console.error('Error al añadir el usuario:', error);
    }
  }

  // Obtener todos los usuarios registrados
  async getAllUsers(): Promise<any[]> {
    const sql = `SELECT * FROM usuarios`;
    try {
      const res = await this.dbInstance?.executeSql(sql, []);
      const usuarios: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        usuarios.push(res.rows.item(i));
      }
      return usuarios;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      return [];
    }
  }

  // Verificar si un usuario con el correo y contraseña ingresados existe
  async validateUser(email: string, password: string): Promise<any> {
    const sql = `SELECT * FROM usuarios WHERE email = ? AND password = ?`;
    try {
      const res = await this.dbInstance?.executeSql(sql, [email, password]);
      if (res.rows.length > 0) {
        return res.rows.item(0); // Retorna el usuario encontrado
      }
      return null;
    } catch (error) {
      console.error('Error al validar las credenciales del usuario:', error);
      return null;
    }
  }

  // Guard para proteger rutas si el usuario está autenticado
  async canActivate(): Promise<boolean> {
    const usuarioRegistrado = await this.getAllUsers(); // Obtener los usuarios registrados
    if (usuarioRegistrado.length > 0) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
