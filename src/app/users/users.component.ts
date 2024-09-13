import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy{
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
  data:any = [];
  filterData:any;
  isUser:boolean = false;
  uid:string = "";
  subscribe:any;
  userInformation:any = {
    name: "",
    length: 0,
    lengthToday: 0,
    uid: "",
    dateFrom: ''
  };
  constructor(private api: ApiService, private rouit: Router, private urlx : ActivatedRoute) { }

  
  ngOnInit(): void {
    this.api.isUser.subscribe((user: any) => {
      if(user){
        this.isUser = true;
        this.uid = user.uid;
        this.api.idUser = user.uid
      }else{
        this.isUser = false;
        this.rouit.navigateByUrl('login');
      }
      this.subscribe = this.api.getData(this.uid).subscribe(data => {
        this.filterData = this.data = data.map(element => {
          return {
            Id: element.payload.doc.id,
            ...element.payload.doc.data() as {}
            
          }
        })
      })
      this.api.getUserInformation().subscribe(data => {
        this.userInformation = data;
      })
    })
   
  }
  filter(value:any){
    var date = value.split('-')
      var month = Number(date[1])
      var day = Number(date[2]);
      var year = date[0],
      newdate = year + "/" + month + "/" + day,
      newmonth = year + "/" + month ;
      console.log(newdate)
    if(value){
      this.filterData = this.data.filter((p:any) => {
        return p.dateTime.includes(newdate)
      })
    }
    else{
      this.filterData = this.data
    }
  }
  ngOnDestroy(){
    this.subscribe.unsubscribe()
  }
  url:any;
  edite:any = [];
  editeFile:any;
  deleteItem:any = [];
  @ViewChild('img')
  img!: ElementRef;
  onCustomAction(event:any){
    if(event.action == "openqr"){
      const Id = event.data.Id;
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
    const Idres = this.deleteItem.Id;
    this.api.delete(Idres, this.deleteItem.uid);
    document.getElementById("window-delete")?.classList.add("d-none")
  }
  /*onEdite */
  onEdite(event:any){
    this.api.onEdite(event.value,this.editeFile, this.edite.id, this.edite.uid);
    
    document.getElementById('edite')?.classList.add("d-none");
    this.img.nativeElement.value = "";
    this.editeFile = null
  }
  uploadEdite(file:any){
    this.editeFile = file.target.files[0];

  }
  exite() {
    document.getElementById("window")?.classList.add("d-none")
  }
}
export interface userInformation {
  name: string;
  length:number;
  lengthToday:number;
  uid:string;
  dateFrom:string

}