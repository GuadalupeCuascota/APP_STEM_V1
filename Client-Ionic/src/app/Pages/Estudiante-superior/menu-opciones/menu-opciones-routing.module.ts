import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuOpcionesPage } from './menu-opciones.page';

const routes: Routes = [
  {
  path:'',
  component: MenuOpcionesPage,
  children:[
    {
      path: 'tabs',
      loadChildren: () => import('../menu-tabs1/menu-tabs1.module').then( m => m.MenuTabs1PageModule)
    },
    {
        path: 'home-superior',
        loadChildren: () => import('../home-superior/home-superior.module').then( m => m.HomeSuperiorPageModule)
      },
  ]
  
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuOpcionesPageRoutingModule {}
