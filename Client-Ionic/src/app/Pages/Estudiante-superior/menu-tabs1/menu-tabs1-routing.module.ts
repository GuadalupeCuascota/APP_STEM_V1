import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTabs1Page } from './menu-tabs1.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home-superior',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuTabs1Page,
    children: [
      {
        path: 'home-superior',
        loadChildren: () =>
          import(
            '../../Estudiante-superior/home-superior/home-superior.module'
          ).then((m) => m.HomeSuperiorPageModule),
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

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTabs1PageRoutingModule {}
