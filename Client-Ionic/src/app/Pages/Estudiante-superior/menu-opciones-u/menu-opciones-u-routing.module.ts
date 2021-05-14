import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuOpcionesUPage } from './menu-opciones-u.page';

const routes: Routes = [
  {
    path: '',
    component: MenuOpcionesUPage,
    children:[{
      path: 'menu-principal',
      loadChildren: () => import('../../Estudiante-secundaria/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule),
     
    },
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuOpcionesUPageRoutingModule {}
