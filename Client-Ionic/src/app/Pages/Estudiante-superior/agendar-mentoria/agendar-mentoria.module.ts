import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendarMentoriaPageRoutingModule } from './agendar-mentoria-routing.module';

import { AgendarMentoriaPage } from './agendar-mentoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendarMentoriaPageRoutingModule
  ],
  declarations: [AgendarMentoriaPage]
})
export class AgendarMentoriaPageModule {}
