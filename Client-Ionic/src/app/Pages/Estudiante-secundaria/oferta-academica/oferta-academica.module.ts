import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertaAcademicaPageRoutingModule } from './oferta-academica-routing.module';

import { OfertaAcademicaPage } from './oferta-academica.page';
// import { PagesModule } from '../../pages.module';


@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    OfertaAcademicaPageRoutingModule
  ],
  
  declarations: [OfertaAcademicaPage]
})
export class OfertaAcademicaPageModule {}
