import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuOpcionesSePage } from './menu-opciones-se.page';

const routes: Routes = [
  {
    path: '',
    component: MenuOpcionesSePage,
    children:[{
      path: 'menu-principal',
      loadChildren: () => import('../../Estudiante-secundaria/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule),
     
    },
    {
      path:'perfiles',
      loadChildren:()=>import ('../../perfiles/perfiles.module').then(m=>m.PerfilesPageModule)
    },
    {
      path: 'oferta-academica',
    loadChildren: () => import('../../Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
    },
    {
      path: 'test-aptitud',
      loadChildren: () => import('../../Estudiante-secundaria/test-aptitud/test-aptitud.module').then( m => m.TestAptitudPageModule)
    }
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuOpcionesSePageRoutingModule {}
