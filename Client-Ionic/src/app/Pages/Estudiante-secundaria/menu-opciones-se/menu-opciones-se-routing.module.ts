import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuOpcionesSePage } from './menu-opciones-se.page';

const routes: Routes = [
  {
    path: '',
    component: MenuOpcionesSePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuOpcionesSePageRoutingModule {}
