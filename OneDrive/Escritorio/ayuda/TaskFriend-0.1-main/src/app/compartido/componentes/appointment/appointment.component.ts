import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service'; // Asegúrate de tener este servicio
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  hospitals: any[] = []; // Lista de hospitales (se espera que el servicio la llene)

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private hospitalService: HospitalService
  ) {}

  ngOnInit() {
    // Inicializar el formulario
    this.appointmentForm = this.fb.group({
      specialty: ['', Validators.required],
      hospital: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      notes: [''],
    });

    // Cargar hospitales
    this.loadHospitals();
  }

  // Método para cargar hospitales desde el servicio
  loadHospitals() {
    this.hospitalService.getHospitals().subscribe(
      (data) => {
        this.hospitals = data;
      },
      (error) => {
        console.error('Error al cargar hospitales:', error);
      }
    );
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointmentData = this.appointmentForm.value;
      this.appointmentService.createAppointment(appointmentData).subscribe(
        (response) => {
          console.log('Cita creada con éxito:', response);
          // Aquí puedes redirigir o mostrar un mensaje de éxito
        },
        (error) => {
          console.error('Error al crear la cita:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
