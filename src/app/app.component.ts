import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';
import { OurUsersService } from './service/our-users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'qrCodeFile';
  isUser:boolean = false;
  admin:any =false;
  halfadmin:any;
  subscribe:any;
  filterData:any;
  filterDataMonth:any
  data:any
  user:any = {
    name: ""
  }
  constructor(private api:ApiService, private rouit: Router, private adminUser:OurUsersService){
  }
  logOut(){
    this.api.logout();
    
  }
  ngOnInit(): void {
    
    this.api.isUser.subscribe((user: any) => {
      if(user){
        this.api.idUser = user.uid
        this.isUser = true;
        this.api.getUserInformation().subscribe(user=> {
          this.user = user
          this.halfadmin = this.user.searchReport
          console.log(this.user)
        })
        this.subscribe = this.api.getData(user.uid).subscribe(data => {
          this.filterData = this.data = data.map(element => {
            return {
              Id: element.payload.doc.id,
              ...element.payload.doc.data() as {}
              
            }
          })
          var dateObj = new Date();
          var month = dateObj.getUTCMonth() + 1;
          var day = dateObj.getDate();
          var year = dateObj.getUTCFullYear(),
          newdate = year + "/" + month + "/" + day,
          newdateMonth = year + "/" + month;
          console.log(day)
          this.filterData = this.data.filter((p:any) => {
            return p.dateTime.includes(newdate)
          })
          this.filterDataMonth = this.data.filter((p:any) => {
            return p.dateTime.includes(newdateMonth)
          })
          var obj = {
              length:  this.data.length,
              dateFrom: newdate,
              lengthToday: this.filterData.length,
              lengthMonth: this.filterDataMonth.length,
              dateMonth: newdateMonth,
              uid:user.uid
          }
          this.adminUser.addLengthUser(user.uid, obj)
          if(this.api.adminUser){
            this.admin = true
          }else{
            this.admin = false
          }
        })
      }else{
        this.isUser = false;
      }
    })
    
  }
  fadeNav(){
    document.getElementById('navbarNavAltMarkup')?.classList.toggle("show")
  }
}
