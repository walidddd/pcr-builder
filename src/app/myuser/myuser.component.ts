import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-myuser',
  templateUrl: './myuser.component.html',
  styleUrls: ['./myuser.component.scss']
})
export class MyuserComponent implements OnInit {
  userData:any;
  id:any
  constructor(private rout: ActivatedRoute, private api :ApiService) {
    this.id = this.rout.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.userData = this.api.getDataUser(this.id).subscribe(data => {
      this.userData = data;
      
    })
    
  }
  
}
