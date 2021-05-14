import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertaAcademicaPage } from './oferta-academica.page';

const routes: Routes = [
  {
    path: '',
    component: OfertaAcademicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertaAcademicaPageRoutingModule {}
