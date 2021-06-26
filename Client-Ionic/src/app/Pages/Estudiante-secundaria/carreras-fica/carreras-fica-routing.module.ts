import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarrerasFicaPage } from './carreras-fica.page';

const routes: Routes = [
  {
    path: '',
    component: CarrerasFicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarrerasFicaPageRoutingModule {}
