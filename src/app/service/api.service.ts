import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isUser:any;
  userIdit:any;
  idUser:any;
  adminUser:any;
  constructor(private fs: AngularFirestore, private storges : AngularFireStorage,private router: Router, private auth : AngularFireAuth) { 
    this.isUser = this.auth.user;
      this.isUser.subscribe((x:any) => {
          this.idUser = x.uid 
          if(this.idUser === "MvitowfokEOznYl4wp5LGmFsfK72"){
            this.adminUser  = true;
            
          }else{
            this.adminUser = false
          }
          console.log(this.adminUser)
      });
    
  }
  getUsersAdmin(){
    return this.fs.collection("users").doc(this.idUser).valueChanges().subscribe(data => {
      return data
    })
  }
  addNewUser(data:any, imagePath:File, id:any, uid:any){
    var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getDate();
      var year = dateObj.getUTCFullYear(),
        timeHour = dateObj.getHours(),
        timeM= dateObj.getMinutes(),
        timez = dateObj.getUTCSeconds(),
      newdate = year + "/" + month + "/" + day,
      newdateTime = year + "/" + month + "/" + day + ' :: ' + timeHour + ':' + timeM + ':' + timez

    const objc = {
      ...data,
      uid: uid,
      dateTime: newdate,
      dateOreder: new Date()
    }
     if(imagePath == null){
      this.fs.collection('users').doc(this.idUser).collection("clinets").doc(id).set(objc).then(() => {
        this.router.navigateByUrl("results/" + id)
      })
      this.fs.collection("clinets").doc(id).set(objc);
     }else{
      let ref = this.storges.ref("files/" + imagePath.name)
      ref.put(imagePath).then(()=> {
        ref.getDownloadURL().subscribe(imagePath => {
          let obj = {
            ...data,
            imagePath,
            uid: uid,
            dateTime: newdate,
            dateOreder: new Date()


          }
          this.fs.collection('users').doc(this.idUser).collection("clinets").doc(id).set(obj);
          this.fs.collection("clinets").doc(id).set(obj);

        })
      }).then(() => {
        this.router.navigateByUrl("results/" + id)
      })
     }
     this.fs.collection("users").doc(this.idUser).update({
      dateTimeEnd: newdateTime
    })
     
  }
  getData(uid:string){
    return this.fs.collection('users').doc(uid).collection("clinets", (ref) => ref.orderBy('dateOreder')).snapshotChanges()  }
  getUserInformation(){
    return this.fs.collection("users").doc(this.idUser).valueChanges()
  }
  delete(user:any, uid:any){
    this.fs.collection("users").doc(uid).collection("clinets").doc(user).delete()
    this.fs.collection("clinets").doc(user).delete().then(()=> {
      document.getElementById("done")?.classList.add("d-none")
    })
  }
  onEdite(data:any,imagePath:any, id:any, uid:any) {
    if(imagePath == null){
      this.fs.collection("clinets").doc(id).update(data).then(() => {
        document.getElementById("window-add")?.classList.add('d-none');
        this.router.navigateByUrl("results/" + id)
      })
      this.fs.collection("users").doc(uid).collection("clinets").doc(id).update(data)
    }else{
      let ref = this.storges.ref("files/" + imagePath.name)
      ref.put(imagePath).then(()=> {
        ref.getDownloadURL().subscribe(imagePath => {
          let obj = {
            ...data,
            imagePath: imagePath
          }
          this.fs.collection("clinets").doc(id).update(obj).then(() => {
            document.getElementById("window-add")?.classList.add('d-none');
            this.router.navigateByUrl("results/" + id)
          })
          this.fs.collection("users").doc(uid).collection("clinets").doc(id).update(obj)

        })
      })
     }
  }
  getDataUser(Id:any){
    return this.fs.collection("clinets").doc(Id).valueChanges()

  }
  login(email:any, password:any){
    return this.auth.auth.signInWithEmailAndPassword(email, password).then(()=> {
      this.isUser = this.auth.user;
      this.isUser.subscribe((x:any) => {
          this.idUser = x.uid 
          if(this.idUser === "MvitowfokEOznYl4wp5LGmFsfK72"){
            this.adminUser  = true;
            
          }else{
            this.adminUser = false
          }
          console.log(this.adminUser)
      });
    })
    
  }
  logout(){
    return this.auth.auth.signOut()
  }
  addFile(file:any, id:any){
    let ref = this.storges.ref("files/" + file.name)
    ref.put(file).then(()=> {
      ref.getDownloadURL().subscribe(filePath => {
        let obj = {
          filePath,
        }
        this.fs.collection("clinets").doc(id).update(obj);

        this.fs.collection("users").doc(this.idUser).collection('clinets').doc(id).update(obj)
        this.router.navigateByUrl("user/" + id)
      })
    })
  }
  
}
