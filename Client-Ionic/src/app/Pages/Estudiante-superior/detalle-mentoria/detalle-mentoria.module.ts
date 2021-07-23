import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleMentoriaPageRoutingModule } from './detalle-mentoria-routing.module';

import { DetalleMentoriaPage } from './detalle-mentoria.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleMentoriaPageRoutingModule
  ],
  declarations: [DetalleMentoriaPage]
})
export class DetalleMentoriaPageModule {}
