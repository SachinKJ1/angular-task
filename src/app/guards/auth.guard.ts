import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard {
  canActivate() {
    if (inject(AuthService).getAuthorizationToken()) {
      return true
    }
    return inject(Router).createUrlTree(['/login']);;
  }
}

const canActivateTeam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuard).canActivate();
};

export default canActivateTeam;
