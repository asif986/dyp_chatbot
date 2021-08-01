import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from  'rxjs';
import { Storage } from  '@ionic/storage';
import { tap } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;
  constructor(public navctrl:NavController, public  afAuth:  AngularFireAuth) 
  {
    this.afAuth.authState.subscribe(user => {
      console.log(user)
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })


  }

  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email,password)
    this.navctrl.navigateRoot('/conversation')
    return result;
}


async register(email: string, password: string) {
  var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
  this.navctrl.navigateRoot('conversation')
  return result;
  //this.sendEmailVerification();
}
async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
}
async logout(){
var result =   await this.afAuth.signOut();
  localStorage.removeItem('user');
  this.navctrl.navigateRoot(['login']);
  return result;


}
get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}

// async  loginWithGoogle(){
//   await  this.afAuth.signInWithPopup(ncp .env .env.prodew GoogleAuthProvider())
//   this.router.navigate(['admin/list']);

// }
}
