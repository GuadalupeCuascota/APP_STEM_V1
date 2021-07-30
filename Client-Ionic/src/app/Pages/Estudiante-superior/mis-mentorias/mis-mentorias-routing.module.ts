import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisMentoriasPage } from './mis-mentorias.page';

const routes: Routes = [
  {
    path: '',
    component: MisMentoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisMentoriasPageRoutingModule {}
