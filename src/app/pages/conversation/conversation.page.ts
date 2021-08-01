import { AlertController, IonContent, LoadingController } from "@ionic/angular";
import { Component, OnInit, ViewChild } from "@angular/core";

import { AuthService } from "src/app/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-conversation",
  templateUrl: "./conversation.page.html",
  styleUrls: ["./conversation.page.scss"],
})
export class ConversationPage implements OnInit {
  newmsg = "";
  @ViewChild(IonContent) content: IonContent;
  messages = [];
  butttons = [];
  localhostIP = environment.localhostIP;
  constructor(
    private iab: InAppBrowser,
    public authservice: AuthService,
    public httpclient: HttpClient,
    public loadingctr: LoadingController,
    public alterctrl: AlertController
  ) {}

  ngOnInit() {
    console.log(this.messages);
    let body = {
      msg: "Hi"
    };
    //running code for wishesh message--start--
    //*note first comment above body variable
//    let today = new Date();
  //  let curHr = today.getHours();
    //let body ;
    // if (curHr < 12) {
    //   body = {
    //     msg: "good morning",
    //   };
    //   console.log("good morning");
    // } else if (curHr < 18) {
    //   console.log("good afternoon");
    //   body = {
    //     msg: "good afternoon",
    //   };
    // } else {
    //   console.log("good evening");
    //   body = {
    //     msg: "good evening",
    //   };
    // }
    //--end--
    //   console.log(body);
    let currentDate = new Date();
    this.apicall(body);
  }

  sendmsg(param?: string) {
    let body = {
      msg: param === undefined ? this.newmsg : param,
    };

    console.log(param);
    console.log(body);
    let currentDate = new Date();
    this.apicall(body);
    this.messages.push({
      user: "harsh",
      createAt: new Date(),
      msg: body.msg,
    });
    this.newmsg = "";
  }
  async logout() {
    const loading = await this.loadingctr.create({
      message: "Please wait..",
      duration: 2000,
    });
    const alert = await this.alterctrl.create({
      message: "Thank you for using Our DYPChatBot!!!",
      buttons: [{ text: "Ok", role: "Ok" }],
    });

    loading.present();
    await this.authservice.logout().then((res) => {
      console.log(res);
      setTimeout(() => {
        loading.dismiss();
        alert.present();
      }, 2000);
    });
  }

  public dynamicCol() {
    let row;
    if (this.butttons.length == 8) {
      row = 3;
    }
    console.log(this.butttons.length);
    return row;
  }
  apicall(msg) {
    console.log(msg);
    this.httpclient.post(this.localhostIP, msg).subscribe(
      (data: any) => {
        let mainstring;
        console.log(data.res.includes("*"));
        if (data.res.includes("*")) {
        //  console.log();

          mainstring = data.res.substring(0, data.res.indexOf("*") - 1);
        } else {
          mainstring = data.res;
        }
       // console.log(mainstring);

        //substring created from * to bottom of msg + 2 because * +' '+' ' means empty space two times
        let options = data.res.substring(data.res.indexOf("*") + 2);
        let t = options.split("\n");
        this.butttons = t;
        let nbtn = [];
        this.butttons.forEach((item) => {
          let data = JSON.parse(item);
          nbtn.push({ ...data });
          console.log(data);
        });
        this.butttons = nbtn;
        console.log(nbtn);
        this.messages.push({
          user: "bot",
          createAt: new Date(),
          msg: mainstring,
        });
        console.log(JSON.stringify(data));
        setTimeout(() => {
          this.content.scrollToBottom(400);
        }, 500);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  inAppBrowser()
  {
    const browser = this.iab.create('https://ionicframework.com/');
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
   });
   
   browser.close();
  }
}
