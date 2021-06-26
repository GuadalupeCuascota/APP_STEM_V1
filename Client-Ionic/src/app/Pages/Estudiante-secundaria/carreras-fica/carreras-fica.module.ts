import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarrerasFicaPageRoutingModule } from './carreras-fica-routing.module';

import { CarrerasFicaPage } from './carreras-fica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarrerasFicaPageRoutingModule
  ],
  declarations: [CarrerasFicaPage]
})
export class CarrerasFicaPageModule {}
