import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePerfilPageRoutingModule } from './detalle-perfil-routing.module';

import { DetallePerfilPage } from './detalle-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePerfilPageRoutingModule
  ],
  declarations: [DetallePerfilPage]
})
export class DetallePerfilPageModule {}
