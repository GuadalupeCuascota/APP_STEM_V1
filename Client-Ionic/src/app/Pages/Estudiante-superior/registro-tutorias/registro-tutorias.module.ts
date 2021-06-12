import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroTutoriasPageRoutingModule } from './registro-tutorias-routing.module';

import { RegistroTutoriasPage } from './registro-tutorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroTutoriasPageRoutingModule
  ],
  declarations: [RegistroTutoriasPage]
})
export class RegistroTutoriasPageModule {}
