import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { userData } from 'src/app/Models/interfaces.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  userInfo: userData;
  
  constructor(public alterctrl:AlertController,
    public loadingctr:LoadingController,
    public authservice:AuthService,
    public tostctrl:ToastController,
    public navctrl:NavController) { }
  email="harshadtibile@gmail.com";
  password="123456";
  ngOnInit() {
  }
  gotoRegister()
  {
    this.navctrl.navigateForward('register')

  }
  async login()
  {
    const loading = await this.loadingctr.create({message:"Please wait..",duration:2000});
    loading.present();
const alert = await this.alterctrl.create({message:"WelCome To DYPChatBot!!!",buttons:[{text:"Ok",role:'Ok'}]})
    //const tost = await this.tostctrl.create({message})
    await this.authservice.login(this.email,this.password).then((res:any)=>
    {

      console.log(res);
      setTimeout(() => {
        loading.dismiss()
        alert.present();
      }, 2000);

    },async(error)=>
    {
      const toast = await this.tostctrl.create({message:error.message,duration:2000})
    toast.present();
    console.log(error.message)
  })
    console.log(this.email,this.password)
  }
}
