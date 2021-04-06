import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPrincipalUPageRoutingModule } from './menu-principal-u-routing.module';

import { MenuPrincipalUPage } from './menu-principal-u.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPrincipalUPageRoutingModule
  ],
  declarations: [MenuPrincipalUPage]
})
export class MenuPrincipalUPageModule {}
