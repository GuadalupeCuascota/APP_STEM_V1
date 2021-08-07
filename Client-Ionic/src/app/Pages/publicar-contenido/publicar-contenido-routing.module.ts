import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicarContenidoPage } from './publicar-contenido.page';

const routes: Routes = [
  {
    path: '',
    component: PublicarContenidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicarContenidoPageRoutingModule {}
