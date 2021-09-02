import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroTutoriasPageRoutingModule } from './registro-tutorias-routing.module';

import { RegistroTutoriasPage } from './registro-tutorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,  ///IMPORTAR EN TODOS LOS MÓDULOS
    IonicModule,
    RegistroTutoriasPageRoutingModule
  ],
  declarations: [RegistroTutoriasPage]
})
export class RegistroTutoriasPageModule {}
