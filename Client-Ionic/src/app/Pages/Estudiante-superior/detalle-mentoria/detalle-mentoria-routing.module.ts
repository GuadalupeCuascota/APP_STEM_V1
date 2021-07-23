import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleMentoriaPage } from './detalle-mentoria.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleMentoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleMentoriaPageRoutingModule {}
