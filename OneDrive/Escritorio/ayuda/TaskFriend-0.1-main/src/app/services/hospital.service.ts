// src/app/service/hospital.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';  // Asegúrate de tener el modelo de Hospital

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiUrl = 'https://miapi.com/hospitales';  // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener la lista de hospitales
  getHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.apiUrl);
  }

  // Obtener un hospital por su ID
  getHospitalById(id: string): Observable<Hospital> {
    return this.http.get<Hospital>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo hospital
  createHospital(hospital: Hospital): Observable<Hospital> {
    return this.http.post<Hospital>(this.apiUrl, hospital);
  }
}
