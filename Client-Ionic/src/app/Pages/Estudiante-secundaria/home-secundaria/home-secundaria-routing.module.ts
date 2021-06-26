import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSecundariaPage } from './home-secundaria.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSecundariaPage,
    // children: [
    //   {
    //     path: 'perfiles',
    //     loadChildren: () =>
    //       import(
    //         '../../perfiles/perfiles.module'
    //       ).then((m) => m.PerfilesPageModule)
    //       },
    //     ]
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSecundariaPageRoutingModule {}
