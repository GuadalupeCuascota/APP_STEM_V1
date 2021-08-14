import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPrincipalPage } from './menu-principal.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalPage,
    children: [
    
      {
        path: 'home-secundaria',
        loadChildren: () =>
          import(
            '../../Estudiante-secundaria/home-secundaria/home-secundaria.module'
          ).then((m) => m.HomeSecundariaPageModule),
      },

      {
        path: 'perfiles',
        loadChildren: () =>
          import('../../perfiles/perfiles.module').then(
            (m) => m.PerfilesPageModule
          ),
      },
      {
        path: 'noticias',
        loadChildren: () =>
          import('../../noticias/noticias.module').then(
            (m) => m.NoticiasPageModule
          ),
      },
      {
        path: 'carreras-fica',
        loadChildren: () =>
          import('../../Estudiante-secundaria/carreras-fica/carreras-fica.module').then(
            (m) => m.CarrerasFicaPageModule
          ),
      },
      {
        path: 'carreras-fica',
        loadChildren: () =>
          import('../../Estudiante-secundaria/carreras-fica/carreras-fica.module').then(
            (m) => m.CarrerasFicaPageModule
          ),
      },
      {
        path: 'test-aptitud',
        loadChildren: () => import('../../Estudiante-secundaria/test-aptitud/test-aptitud.module').then( m => m.TestAptitudPageModule)
      },
      {
        path: '',
        redirectTo:'home-secundaria',
        pathMatch: 'full'
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPrincipalPageRoutingModule {}
