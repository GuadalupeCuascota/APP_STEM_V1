import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './Administrador/Components/usuario-list/usuario-list.component';
import {RolesListComponent } from './Administrador/Components/roles-list/roles-list.component';

const routes: Routes = [
  // {
  //   path: '',
  //    redirectTo: '/usuarios',
  //    pathMatch: 'full'
  // },
  // {
  //    path: 'usuarios',
  //   component: UsuarioListComponent

  // }
  {
    path: 'roles',
    component:RolesListComponent
  },
  {
    path: 'usuarios',
    component:UsuarioListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
