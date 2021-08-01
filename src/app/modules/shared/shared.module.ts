import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
//  declarations: [],
  imports: [
    CommonModule,RouterModule,
    IonicModule
  ]
  ,
  declarations: [HeaderComponent],
  exports:
  [
    HeaderComponent
  ],

})
export class SharedModule { }
