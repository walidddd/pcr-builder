import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user:any;
  file:any = null;
  url:any;
  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.user =this.api.userIdit;
    this.api.isUser.subscribe((user: any) => {
      if(user){
        
      }else{
        this.router.navigateByUrl('login');
      }
    })
  }
  qr(){
    document.getElementById("qr")?.classList.remove("d-none")
    this.url = window.location.origin + '/#/' + 'user' + '/' + this.user.id

  }
  onAdd(f:any){
    document.getElementById("window-add")?.classList.remove('d-none')
   
  }
 

  uploadAdd(event:any){
    this.file = event.target.files[0];
    
  }
  onAddDone(f:any) {
    this.api.onEdite(f.value,this.file ,this.user.id, this.user.uid)
    console.log(f.value)
    console.log(this.file)
    document.getElementById("button1")?.classList.add("d-none");
    document.getElementById("button2")?.classList.add("d-none");
    document.getElementById("load")?.classList.remove("d-none");
    
  }
  fadeOutDelete(){
    document.getElementById("window-add")?.classList.add("d-none")
  }
}
