import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSuperiorPageRoutingModule } from './home-superior-routing.module';

import { HomeSuperiorPage } from './home-superior.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSuperiorPageRoutingModule
  ],
  declarations: [HomeSuperiorPage]
})
export class HomeSuperiorPageModule {}
