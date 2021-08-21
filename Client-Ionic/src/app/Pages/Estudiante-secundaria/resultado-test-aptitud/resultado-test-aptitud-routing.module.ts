import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoTestAptitudPage } from './resultado-test-aptitud.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadoTestAptitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadoTestAptitudPageRoutingModule {}
