import { Component } from "@angular/core";

import { NavController, Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Storage } from "@ionic/storage";

import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  reUPages = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    public navctrl: NavController
  ) {
    this.authService.redirectionUser();
    this.initializeApp();
    this.reUPages = [
      {
        name: "Main Menu",
        path: "/menu",
      },

      {
        name: "Logout",
        path: "login",
      },
    ];
  }

  redirectMenu(path) {
    console.log(path);
    if (path == "login") {
      this.authService.logout();
    } else {
      this.navctrl.navigateForward(path);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
