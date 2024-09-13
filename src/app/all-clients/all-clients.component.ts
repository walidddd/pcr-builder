import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { OurUsersService } from '../service/our-users.service';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.scss']
})
export class AllClientsComponent implements OnInit, OnDestroy {
  dataUsers:any;
  saifData:any;
  filterData:any;
  filterDataDay:any;
  filterDataMonth:any;
  subscribe:any;
  settings = {
   
    actions: {
      columnTitle: 'Actions',
      add:false,
      edit: false,
      delete: false,
      
      custom: [
        { name: 'openqr', title: ' فتح qr '},
        { name: 'edite', title: ' تعديل'},
        { name: 'delete', title: ' حذف '},
      ],
      position: 'right'
    },
    
    columns: {
      name: {
        title: 'الاسم',
      },
      nameen: {
        filter: true,
        title: 'name'
      },
     
      
      regdate: {
        title: 'Reg. Date',
        filter: true,
      },
      regtime: {
        title: 'Reg. Date',
        filter: false,
      },
      repoteddate: {
        title: 'Repoted Date',
        filter: true,
      },
      repotedtime: {
        title: 'Repoted Date',
        filter: false,
      },
      result: {
        title: 'result',
        filter: false,
      },
      dateTime: {
        
        title: 'Date',
        filter: true,
      },
    }
  };
  constructor(private ourUsers: OurUsersService, private api: ApiService, private rouit : Router) { }
  url:any;
  edite:any = [];
  editeFile:any;
  deleteItem:any = [];

  ngOnInit(): void {
    if(this.api.adminUser){

    }else{
      this.rouit.navigateByUrl("users")
    }
    this.ourUsers.getUsersAdmin().subscribe(data=>{
      this.dataUsers = data
      console.log(this.dataUsers)
    })
    this.subscribe = this.ourUsers.saifadlinClients().subscribe(saifData => {
      this.saifData = saifData;
      this.filterData = saifData
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
  onCustomAction(event:any){
    if(event.action == "openqr"){
      const Id = event.data.id;
      this.url = window.location.origin + '/#/' + 'user' + '/' + Id
      console.log(window.location.origin + '/#/' + 'user' + '/' + Id)
      document.getElementById("window")?.classList.remove("d-none")
    }
    if(event.action == "delete"){
      this.deleteItem = event.data;
    document.getElementById("window-delete")?.classList.remove("d-none")
    }
    if(event.action == "edite"){
      
      this.edite = event.data;
      this.api.userIdit = event.data
      document.getElementById('edite')?.classList.remove("d-none");
      this.rouit.navigateByUrl("edit")
    }
    //this.rouit.navigateByUrl(`user/${Id}`)
  }
  

  onDeleteConfirm(event:any){
    
  }
  fadeOutDelete(){
    document.getElementById("window-delete")?.classList.add("d-none")
  }
  onfadeOutDelete(){
    const Idres = this.deleteItem.id;
    this.api.delete(Idres, this.deleteItem.uid);

    document.getElementById("window-delete")?.classList.add("d-none")
  }
  /*onEdite */

  
  exite() {
    document.getElementById("window")?.classList.add("d-none")
  }
  filterUsers:any = ""
  newdate:any = ""
  filter(value:any){
    var date = value.split('-')
      var month = Number(date[1])
      var day = Number(date[2]);
      var year = date[0],
      newdate = year + "/" + month + "/" + day,
      newmonth = year + "/" + month ;
      this.newdate = newdate;
      console.log(newdate)
    
  }
  filterUser(value:any){
    this.filterUsers = value
    /*
    if(value){
      this.filterData = this.saifData.filter((p:any) => {
        return p.uid.includes(value)
      })
    }
    else{
      this.filterData = this.saifData
    }*/
  }
  search(){
    if(this.newdate || this.filterUsers){
      this.filterData = this.saifData.filter((p:any) => {
        return p.dateTime.includes(this.newdate)
      }).filter((p:any) => {
        return p.uid.includes(this.filterUsers)
      })
      
    }
    
    else{
      this.filterData = this.saifData
    }
  }
  ngOnDestroy(){
    this.subscribe.unsubscribe()
  }
}
