import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isUser:boolean = false;
  constructor(private api: ApiService, private rouite: Router) { }

  ngOnInit(): void {
    this.api.isUser.subscribe((user: any) => {
      if(user){
        this.isUser = true;
        this.rouite.navigateByUrl('users');

      }else{
        this.isUser = false
      }
    })
  }
  onSub(f:any){
    this.api.login(f.value.email, f.value.password).then(res => console.log(res));
  }

}
