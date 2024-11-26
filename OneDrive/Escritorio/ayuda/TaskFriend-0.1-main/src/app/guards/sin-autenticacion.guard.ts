import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class SinAutenticacionGuard implements CanActivate {

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.firebaseSvc.getAuthState().pipe(map(login => {

      //====Usuario no Autenticado====
      if (!login) {
        return true;
      } else {
        //====Usuario Autenticado====
        this.utilSvc.routerLink('/inicio/home');
        return false;
      }
    }))

  }
}