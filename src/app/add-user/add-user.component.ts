import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  file:any;
  isUser:boolean = false
  constructor(private api: ApiService, private router: Router) { }
  id:any;
  url:any
  uid:any;
  ngOnInit(): void {
    this.api.isUser.subscribe((user: any) => {
      this.uid = user.uid
      if(user){
        this.isUser = true;
      }else{
        this.isUser = false;
        this.router.navigateByUrl('login');
      }
    })
    this.url = window.location.origin + '/#/' + 'user' + '/' + this.id
  }
  qr(){
    document.getElementById("qr")?.classList.remove("d-none")
    this.url = window.location.origin + '/#/' + 'user' + '/' + this.id

  }
  onAdd(form:any){
    
    document.getElementById("window-add")?.classList.remove("d-none")
    
  }
  uploadAdd(event:any){
    this.file = event.target.files[0];
    
  }
  onAddDone(f:any) {
    this.api.addNewUser(f.value, this.file, f.value.id, this.uid);
    document.getElementById("button1")?.classList.add("d-none");
    document.getElementById("button2")?.classList.add("d-none");
    document.getElementById("load")?.classList.remove("d-none");
    
  }
  fadeOutDelete(){
    document.getElementById("window-add")?.classList.add("d-none")
  }
}
