import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuOpcionesPage } from './menu-opciones.page';

const routes: Routes = [
  {
    path: '',
    component: MenuOpcionesPage,
    children:[{
      path: 'home-superior',
      loadChildren: () => import('../home-superior/home-superior.module').then( m => m.HomeSuperiorPageModule),
    },
  ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuOpcionesPageRoutingModule {}
