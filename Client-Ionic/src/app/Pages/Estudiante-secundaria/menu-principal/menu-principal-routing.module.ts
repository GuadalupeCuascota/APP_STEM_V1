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
        path: 'mi-perfil',
        loadChildren: () =>
          import('../../mi-perfil/mi-perfil.module').then(
            (m) => m.MiPerfilPageModule
          ),
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
        path: '',
        redirectTo:'/menu-principal/home-secundaria',
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
