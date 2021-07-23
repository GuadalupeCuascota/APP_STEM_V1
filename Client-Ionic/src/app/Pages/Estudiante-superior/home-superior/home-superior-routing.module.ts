import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSuperiorPage } from './home-superior.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSuperiorPage, 
  //   children:[{
  //     path: 'perfiles',
  //     loadChildren: () => import('../../perfiles/perfiles.module').then( m => m.PerfilesPageModule),
  //   }
  // ]
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSuperiorPageRoutingModule {}
