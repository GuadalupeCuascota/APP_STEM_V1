import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPrincipalPage } from './menu-principal.page';



const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalPage,
    children:[
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      },
      {
        path:'inicio',
        loadChildren:()=>import ('../../inicio/inicio.module').then(m=>m.InicioPageModule)
      },
      {
        path:'perfiles',
        loadChildren:()=>import ('../../perfiles/perfiles.module').then(m=>m.PerfilesPageModule)
      },
      
      {
        path:'noticias',
        loadChildren:()=>import ('../../noticias/noticias.module').then(m=>m.NoticiasPageModule)
      },
      {
        path:'menu',
        loadChildren:()=>import ('../menu-opciones-se/menu-opciones-se.module').then(m=>m.MenuOpcionesSePageModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPrincipalPageRoutingModule {}
