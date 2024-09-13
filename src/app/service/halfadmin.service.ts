import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ApiService } from './api.service';
import { OurUsersService } from './our-users.service';


@Injectable({
  providedIn: 'root'
})
export class HalfadminService implements OnInit {
  dataUsers:any = {
  }
  constructor(private admin: ApiService, private router: Router) { 
    
  }
  ngOnInit(): void {
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean> {
    
    return new Promise(resolve => {
      this.admin.getUserInformation().subscribe(user=> {
        this.dataUsers = user
        if(this.dataUsers.searchReport) {
          resolve(true)
        }
        else{
          resolve(false)
          this.router.navigateByUrl("login")

        }
      })
        
    }) 
  }
}
