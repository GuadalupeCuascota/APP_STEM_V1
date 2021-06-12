import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuOpcionesSePage } from './menu-opciones-se.page';

const routes: Routes = [
  {
    path: '',
    component: MenuOpcionesSePage,
    children:[
      {
      path: 'home-secundaria',
      loadChildren: () => import('../../Estudiante-secundaria/home-secundaria/home-secundaria.module').then( m => m.HomeSecundariaPageModule),
      
    },
   
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuOpcionesSePageRoutingModule {}
