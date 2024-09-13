import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { OurUsersService } from '../service/our-users.service';

@Component({
  selector: 'app-search-report',
  templateUrl: './search-report.component.html',
  styleUrls: ['./search-report.component.scss']
})
export class SearchReportComponent implements OnInit {
  saifadlinClients:any;
  filterData:any ;  
  userInformation:any = {
    name: "",
    length: 0,
    lengthToday: 0,
    uid: "",
    dateFrom: ''
  };
  deleteItem:any = []
  constructor(private api:ApiService, private ourClients: OurUsersService, private rouit : Router) { }

  ngOnInit(): void {
    this.api.getUserInformation().subscribe(data => {
      this.userInformation = data;
    })
    this.ourClients.saifadlinClients().subscribe(data=> {
      this.saifadlinClients = data
    })
  }
  fadePass(){
    document.getElementById("name")?.classList.add("d-none")
    document.getElementById("pass")?.classList.remove("d-none")

    document.getElementById("addname")?.classList.remove("active")
    document.getElementById("addpass")?.classList.add("active")
  }
  fadeName(){
    document.getElementById("pass")?.classList.add("d-none")

    document.getElementById("name")?.classList.remove("d-none")

    document.getElementById("addname")?.classList.add("active")
    document.getElementById("addpass")?.classList.remove("active")
  }
  searchPss(pass:any){
    if(pass.value){
      this.filterData = this.saifadlinClients.filter((p:any) => {
        return p.id.includes(pass.value)
      })
      document.getElementById("done")?.classList.remove("d-none")
      console.log(this.filterData)
    }
    else{
      this.filterData = [];
    }
    
  }
  searchName(name:any){

  }
  deleteClient(item:any){
    this.deleteItem = item
    document.getElementById("window-delete")?.classList.remove("d-none")

  }
  onfadeOutDelete(){
    const Idres = this.deleteItem.id;
    this.api.delete(Idres, this.deleteItem.uid);    
    document.getElementById("window-delete")?.classList.add("d-none")
  }
  fadeOutDelete(){
    document.getElementById("window-delete")?.classList.add("d-none")
  }
  goEdit(event:any){
      this.api.userIdit = event
      document.getElementById('edite')?.classList.remove("d-none");
      this.rouit.navigateByUrl("edit")
  }
  open(id:any){
    this.rouit.navigateByUrl("user/"+ id)

  }
}
