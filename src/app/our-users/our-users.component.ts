import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { OurUsersService } from '../service/our-users.service';

@Component({
  selector: 'app-our-users',
  templateUrl: './our-users.component.html',
  styleUrls: ['./our-users.component.scss']
})
export class OurUsersComponent implements OnInit {

  constructor(private ourUsers: OurUsersService, private api: ApiService, private rouit : Router) { }
  dataUsers:any;
  saifData:any;
  filterDataDay:any;
  filterDataMonth:any;
  deleteItem:any = []
  ngOnInit(): void {
    if(this.api.adminUser){

    }else{
      this.rouit.navigateByUrl("users")
    }
    this.ourUsers.getUsersAdmin().subscribe(data=>{
      this.dataUsers = data
    })
    this.ourUsers.saifadlinClients().subscribe(saifData => {
      this.saifData = saifData
      var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear(),
        newdate = year + "/" + month + "/" + day,
        newdateMonth = year + "/" + month;
        this.filterDataDay = this.saifData.filter((p:any) => {
          return p.dateTime.includes(newdate)
        })
        this.filterDataMonth = this.saifData.filter((p:any) => {
          return p.dateTime.includes(newdateMonth)
        })
    })
    
  }
  fadeForm(){
    document.getElementById("window")?.classList.remove('d-none')
  }
  exite(){
    document.getElementById("window")?.classList.add('d-none');
    document.getElementById("window-email")?.classList.add('d-none')

  }
  searchReport:any = false;
  onAdd(form:any){
    if(form.value.searchReport === "true"){
      this.searchReport = true
    }else{
      this.searchReport = false;
    }
    let obj = {
      ...form.value,
      admin: false,
      searchReport:this.searchReport
    }
    this.ourUsers.signUp(obj)
  }
  delete(user:any){
    this.deleteItem = user;
    document.getElementById("window-d")?.classList.remove("d-none")

  }
  onfadeOutDelete(){
    this.ourUsers.delete(this.deleteItem)
    document.getElementById("window-d")?.classList.add("d-none")

  }
  fadeOutDelete(){
    document.getElementById("window-d")?.classList.add("d-none")
  }
  email = {email: "", password:""};
  showEmail(user:any){
    document.getElementById("window-email")?.classList.remove('d-none')
    this.email = user;
  }
}
