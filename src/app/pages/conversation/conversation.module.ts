import {AutosizeModule} from 'ngx-autosize';
import { CommonModule } from '@angular/common';
import { ConversationPage } from './conversation.page';
import { ConversationPageRoutingModule } from './conversation-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutosizeModule,
    IonicModule,
    SharedModule,
    ConversationPageRoutingModule
  ],
  declarations: [ConversationPage]
})
export class ConversationPageModule {}
