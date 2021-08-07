import {
  AlertController,
  LoadingController,
  Platform,
  ToastController,
} from "@ionic/angular";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Component, OnInit } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "src/app/services/auth.service";
import { NgForm } from "@angular/forms";
import { environment } from "../../../environments/environment";

//import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  name: string = "";
  email: string = "";
  password: string = "";
  placeholderimg = "assets/img/placeholderimg.png";
  ref: AngularFireStorageReference;
  checkBrowser = false;
  task: AngularFireUploadTask;
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
  };
  confirm: string = "";
  //readonly token = environment.dialogflow.angularBot;
  //readonly client = new ApiAiClient({ accessToken: this.token });

  constructor(
    public alterctrl: AlertController,
    public loadingctr: LoadingController,
    public authservice: AuthService,
    public alertController: AlertController,
    public tostctrl: ToastController,
    private afStorage: AngularFireStorage,
    private platform: Platform,
    private camera: Camera,
    public afstore: AngularFirestore
  ) {}

  ngOnInit() {
    // this.client.textRequest("text").then(res=>{console.log(res)})
    this.platform.ready().then((res) => {
      if (this.platform.is("android") ) {
        console.log(this.platform.is("android"))
        //   console.log('android');
        //  target = "_blank";
        //  target = "_blank";
      } else if(this.platform.is("ios"))
      {

        console.log(this.platform.is("ios"))
      }else {
        this.checkBrowser = true; //fallback to browser APIs or
        //  target = "_system";
        console.log("The platform is not supported");
      }
    });
  }
  async register(form: NgForm) {
    const loading = await this.loadingctr.create({
      message: "Please wait..",
      duration: 2000,
    });
    loading.present();
    const alert = await this.alterctrl.create({
      message: "WelCome To DYPChatBot!!!",
      buttons: [{ text: "Ok", role: "Ok" }],
    });
    console.log(form.form.value);
    if (form.form.value !== "") {
      this.authservice.register(this.email, this.password).then(
        (res) => {
          let uuid1 = res;
          console.log(res.user.uid);
          this.afstore
            .collection("students")
            .doc(uuid1.user.uid)
            .set({
              user: this.name,
              // branchname:this.branch,
              // semester:this.selectedsemestes,
              // subjects:this.selectedsubjects,
              // profileLink:data,
              //authid:this.authid
            })
            .then((res) => {
              //   let nm=this.name;
              //   this.helper.hideLoader();
              // this.helper.presentAlert("Success", "Information Successfully Saved.");
              // this.authService.accountDetails({nm,data});
              // this.navCtrl.navigateRoot(['home']);
              console.log(res);
            });
          this.task.then(async (res) => {
            //console.log(res)
            await this.ref.getDownloadURL().subscribe((data) => {
              this.afstore
                .collection("students")
                .doc(uuid1.user.uid)
                .set({
                  user: this.name,
                  // branchname:this.branch,
                  // semester:this.selectedsemestes,
                  // subjects:this.selectedsubjects,
                  profileLink: data,
                  //authid:this.authid
                })
                .then((res) => {
                  //   let nm=this.name;
                  //   this.helper.hideLoader();
                  // this.helper.presentAlert("Success", "Information Successfully Saved.");
                  // this.authService.accountDetails({nm,data});
                  // this.navCtrl.navigateRoot(['home']);
                  console.log(res);
                });

              //     console.log(data)
              //this.profileLink =  data;
            });
          });
          console.log(res);
          setTimeout(() => {
            loading.dismiss();
            alert.present();
          }, 2000);
        },
        async (error) => {
          const toast = await this.tostctrl.create({
            message: error.message,
            duration: 2000,
          });
          toast.present();
          console.log(error.message);
        }
      );
      console.log(this.email);
    } else {
      const toast = await this.tostctrl.create({
        message: "Please Enter details",
        duration: 2000,
      });
      toast.present();
    }
  }
  async takeSnap($event?) {
    this.platform.ready().then(() => {
      if (this.platform.is("android") || this.platform.is("ios")) {
        //   console.log('android');
        //  target = "_blank";
        this.camera.getPicture(this.cameraOptions).then(
          (imageData) => {
            // this.camera.DestinationType.FILE_URI gives file URI saved in local
            // this.camera.DestinationType.DATA_URL gives base64 URI
            let base64Image = "data:image/jpeg;base64," + imageData;
            const id = Math.random().toString(36).substring(2);
            this.ref = this.afStorage.ref(id);
            this.placeholderimg = base64Image;
            this.task = this.ref.putString(base64Image, "data_url");

            //console.log(this.profileLink);
            //console.log(this.placeholderimg)
          },
          (err) => {
            console.log(err);
            // Handle error
          }
        );
        //  target = "_blank";
      } else {
        this.checkBrowser = true; //fallback to browser APIs or
        //  target = "_system";
        console.log("The platform is not supported");
      }
    });

    console.log("This is profilelink");
  }
}
