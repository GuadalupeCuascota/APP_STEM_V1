import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroTutoriasPage } from './registro-tutorias.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroTutoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroTutoriasPageRoutingModule {}
