import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestAptitudPage } from './test-aptitud.page';

const routes: Routes = [
  {
    path: '',
    component: TestAptitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestAptitudPageRoutingModule {}
