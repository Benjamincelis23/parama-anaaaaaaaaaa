import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { citasmedicas } from '../models/citasmedicas.model'; // Asegúrate de que el modelo esté bien importado

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://miapi.com/citas'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  createAppointment(appointment: citasmedicas): Observable<citasmedicas> {
    return this.http.post<citasmedicas>(this.apiUrl, appointment);
  }
}
