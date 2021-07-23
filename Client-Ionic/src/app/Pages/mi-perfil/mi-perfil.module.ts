import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiPerfilPageRoutingModule } from './mi-perfil-routing.module';

import { MiPerfilPage } from './mi-perfil.page';

@NgModule({
  imports: [
    ReactiveFormsModule, //se debe importar para utilizar el modulo formGroup
    CommonModule,
    FormsModule,
    IonicModule,
    MiPerfilPageRoutingModule
  ],
  declarations: [MiPerfilPage]
})
export class MiPerfilPageModule {}
