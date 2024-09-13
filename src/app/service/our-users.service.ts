import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OurUsersService {

  constructor(private fs: AngularFirestore, private storges : AngularFireStorage, private auth: AngularFireAuth) {
  }
  getUsersAdmin(){
    return this.fs.collection("users", (ref) => ref.orderBy('length')).valueChanges()
  }
  addLengthUser(doc:any, obj:any){
    this.fs.collection("users").doc(doc).update(obj)
    //this.fs.collection('users', (ref) => ref.orderBy('length')).valueChanges().subscribe(data => (console.log(data)))
  }
  saifadlinClients(){
    return this.fs.collection("clinets", (ref) => ref.orderBy('dateOreder')).valueChanges()
  }
  signUp(form:any){
    return this.auth.auth.createUserWithEmailAndPassword(form.email, form.password).then(data=> {
      this.fs.collection("users").doc(data.user?.uid).set(form).then(()=> {
        document.getElementById('window')?.classList.add();
        location.reload();
      })
    })
  }
  delete(user:any){
    this.auth.auth.signInWithEmailAndPassword(user.email, user.password).then(()=> {
      this.auth.auth.currentUser?.delete();
      location.reload();
    })
    this.fs.collection("users").doc(user.uid).delete();
  }
}
