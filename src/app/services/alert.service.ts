import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Logrado',
      text: message,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  error(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  async confirm(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  }
}
