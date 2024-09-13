import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
 

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  userData:any;
  id:any;
  url:any;
  file:any;
  @ViewChild("resultx", {static: false}) el!: ElementRef
  constructor(private rout: ActivatedRoute, private api :ApiService, private router :Router) {
    this.id = this.rout.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {
    this.userData = this.api.getDataUser(this.id).subscribe(data => {
      this.userData = data;
      console.log(data)
      this.url = window.location.origin + '/#/' + 'user' + '/' + this.id
    })
    this.api.isUser.subscribe((user: any) => {
      if(user){
        
      }else{
        this.router.navigateByUrl('login');
      }
    })
   
  }
  onAddDone() {
    document.getElementById("button1")?.classList.add("d-none");
    document.getElementById("button2")?.classList.add("d-none");
    document.getElementById("load")?.classList.remove("d-none");
    
  }
  fadeOutDelete(){
    document.getElementById("window-add")?.classList.add("d-none")
  }
  uploadAdd(event:any){
    this.file = event.target.files[0];
  }
  onAdd(f:any){
    this.api.addFile(this.file, this.id);
    document.getElementById("buttons")?.classList.add("d-none")
  }
  print() {
    window.print();
    document.getElementById("window-add")?.classList.remove("d-none")

  }
  backEdit() {
      this.api.userIdit = this.userData
      this.router.navigateByUrl("edit")
  }
}
