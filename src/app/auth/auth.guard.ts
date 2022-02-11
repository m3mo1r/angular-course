import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {map, take} from "rxjs/operators";
import {Injectable} from "@angular/core";

import {AuthService} from "./auth.service";
import * as fromApp from "../store/app.reducer";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authService.user.pipe(take(1), map(user => {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      map(user => {
        console.log(user);
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}