import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './Administrador/Components/usuario-list/usuario-list.component';
import {RolesListComponent } from './Administrador/Components/roles-list/roles-list.component';
import { MenuPrincipalEditorComponent} from './Editor/Components/menu-principal-editor/menu-principal-editor.component';
import {RegistroUsuarioComponent} from './Administrador/Components/menu-principal/registro-usuario.component'
import {LoginComponent} from './Login/Components/login/login.component'
import {PerfilesMujeresComponent} from './Editor/Components/perfiles-mujeres/perfiles-mujeres.component'

const routes: Routes = [
  {
    path: '',
     redirectTo: '/login',
     pathMatch: 'full'
  },
  {
     path: 'login',
    component: LoginComponent

  },
  {
    path: 'perfiles',
    component:PerfilesMujeresComponent
  },

  {
    path: 'admin',
    component:RegistroUsuarioComponent
  },
  {
    path: 'roles',
    component:RolesListComponent
  },
  {
    path: 'usuarios',
    component:UsuarioListComponent
  },
  {
    path: 'editor',
    component: MenuPrincipalEditorComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
