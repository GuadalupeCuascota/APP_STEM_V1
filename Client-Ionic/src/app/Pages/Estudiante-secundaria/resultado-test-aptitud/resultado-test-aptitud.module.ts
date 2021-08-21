import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadoTestAptitudPageRoutingModule } from './resultado-test-aptitud-routing.module';

import { ResultadoTestAptitudPage } from './resultado-test-aptitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadoTestAptitudPageRoutingModule
  ],
  declarations: [ResultadoTestAptitudPage]
})
export class ResultadoTestAptitudPageModule {}
