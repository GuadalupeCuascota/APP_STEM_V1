import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroUsuarioPageRoutingModule } from './registro-usuario-routing.module';

import { RegistroUsuarioPage } from './registro-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, //formulario de validacion para datos obligatorios
    RegistroUsuarioPageRoutingModule
  ],
  declarations: [RegistroUsuarioPage]
})
export class RegistroUsuarioPageModule {}
