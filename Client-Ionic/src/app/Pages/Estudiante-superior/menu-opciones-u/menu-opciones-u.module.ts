import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuOpcionesUPageRoutingModule } from './menu-opciones-u-routing.module';

import { MenuOpcionesUPage } from './menu-opciones-u.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuOpcionesUPageRoutingModule
  ],
  declarations: [MenuOpcionesUPage]
})
export class MenuOpcionesUPageModule {}
