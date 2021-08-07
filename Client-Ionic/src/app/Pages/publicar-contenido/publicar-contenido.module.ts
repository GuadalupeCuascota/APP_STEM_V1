import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PublicarContenidoPageRoutingModule } from './publicar-contenido-routing.module';

import { PublicarContenidoPage } from './publicar-contenido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, 
    PublicarContenidoPageRoutingModule
  ],
  declarations: [PublicarContenidoPage]
})
export class PublicarContenidoPageModule {}
