import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthserviceService);
  const router = inject(Router);

  return authService.checkUserToken().pipe(
    map(res => {
      if (res) {
        return true;
      } else {
        alert('session expired');
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(() => {
      return of(router.createUrlTree(['/login']));
    })
  );
};
