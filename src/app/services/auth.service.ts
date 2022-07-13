import { AngularFireAuth } from "@angular/fire/auth";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user;
  constructor(
    public navctrl: NavController,
    public afAuth: AngularFireAuth,
    public storage: Storage
  ) {}

  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password);
    return result;
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    this.navctrl.navigateRoot("conversation");
    return result;
    //this.sendEmailVerification();
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout() {
    var result = await this.afAuth.signOut();
    console.log("logout");
    this.storage
      .clear()
      .then(() => {
        this.navctrl.navigateRoot(["login"]);
      })
      .catch(() => {});
    // return result;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }

  /**
   * Redirections user
   */
  redirectionUser() {
    this.getUserInfo().then((user) => {
      if (user) {
        this.navctrl.navigateRoot("/conversation");
      } else {
        this.navctrl.navigateRoot("/login");
      }
    });
  }

  getUserInfo() {
    return new Promise((reslove, reject) => {
      this.storage
        .get("user_info")
        .then((res) => JSON.parse(res))
        .then((val) => {
          reslove(val);
        });
    });
  }

  setUserInfo() {
    this.afAuth.authState.subscribe((user) => {
      console.log(user.uid);
      if (user) {
        this.user = user;
        this.storage.set("user_info", JSON.stringify(user.uid)).then(() => {
          this.redirectionUser();
        });
      } else {
      }
    });
  }

  // async  loginWithGoogle(){
  //   await  this.afAuth.signInWithPopup(ncp .env .env.prodew GoogleAuthProvider())
  //   this.router.navigate(['admin/list']);

  // }
}
