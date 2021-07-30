import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendarMentoriaPage } from './agendar-mentoria.page';

const routes: Routes = [
  {
    path: '',
    component: AgendarMentoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarMentoriaPageRoutingModule {}
