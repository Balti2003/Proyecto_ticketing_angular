import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  } else {
    alertService.error('Acceso denegado. Esta sección es solo para administradores.');
    router.navigate(['/tickets']);
    return false;
  }
};
