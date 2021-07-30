import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisMentoriasPageRoutingModule } from './mis-mentorias-routing.module';

import { MisMentoriasPage } from './mis-mentorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisMentoriasPageRoutingModule
  ],
  declarations: [MisMentoriasPage]
})
export class MisMentoriasPageModule {}
