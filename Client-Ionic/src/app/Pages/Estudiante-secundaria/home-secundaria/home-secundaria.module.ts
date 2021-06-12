import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSecundariaPageRoutingModule } from './home-secundaria-routing.module';

import { HomeSecundariaPage } from './home-secundaria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSecundariaPageRoutingModule
  ],
  declarations: [HomeSecundariaPage]
})
export class HomeSecundariaPageModule {}
