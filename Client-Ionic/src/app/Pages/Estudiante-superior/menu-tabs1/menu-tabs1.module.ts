import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTabs1PageRoutingModule } from './menu-tabs1-routing.module';

import { MenuTabs1Page } from './menu-tabs1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTabs1PageRoutingModule
  ],
  declarations: [MenuTabs1Page]
})
export class MenuTabs1PageModule {}
