import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarContraseniaPageRoutingModule } from './cambiar-contrasenia-routing.module';

import { CambiarContraseniaPage } from './cambiar-contrasenia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarContraseniaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CambiarContraseniaPage]
})
export class CambiarContraseniaPageModule {}
