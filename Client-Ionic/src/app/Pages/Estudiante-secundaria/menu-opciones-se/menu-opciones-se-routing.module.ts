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
    {
      path: 'menu-principal',
      loadChildren: () => import('../menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule),
      
    },
    {
      path: 'perfiles',
      loadChildren: () => import('../../perfiles/perfiles.module').then( m => m.PerfilesPageModule),
      
    },
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuOpcionesSePageRoutingModule {}
