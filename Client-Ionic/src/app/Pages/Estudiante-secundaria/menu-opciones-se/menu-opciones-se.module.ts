import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuOpcionesSePageRoutingModule } from './menu-opciones-se-routing.module';
import {MenuPrincipalPageModule} from '../menu-principal/menu-principal.module'

import { MenuOpcionesSePage } from './menu-opciones-se.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuOpcionesSePageRoutingModule,
   

    
  ],
  declarations: [MenuOpcionesSePage]
})
export class MenuOpcionesSePageModule {}
