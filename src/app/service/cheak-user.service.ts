import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class CheakUserService {

  constructor(private auth: ApiService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean> {
    return new Promise(resolve => {
      this.auth.isUser.subscribe((user: any) => {
        if(user) resolve(true)
        else {
          resolve(false)
          this.router.navigateByUrl("login")
        }
        
      })
    }) 
  }
}
