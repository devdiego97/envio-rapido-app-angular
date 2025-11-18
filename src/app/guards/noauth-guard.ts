import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const noAuthGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = authService.isLoggedIn(); 

  if (isLogged) {
    router.navigate(['/envios']);
    return false;
  }

  return true
};