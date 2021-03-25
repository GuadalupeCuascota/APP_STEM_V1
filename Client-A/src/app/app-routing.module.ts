import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './Administrador/Components/usuario-list/usuario-list.component';
import {RolesListComponent } from './Administrador/Components/roles-list/roles-list.component';
import { MenuPrincipalEditorComponent} from './Editor/Components/menu-principal-editor/menu-principal-editor.component';
import {MenuPublicacionComponent } from './Editor/Components/menu-publicacion/menu-publicacion.component';
import {RegistroUsuarioComponent} from './Administrador/Components/menu-principal/registro-usuario.component';
import {LoginComponent} from './Login/Components/login.component'
import {PerfilesMujeresComponent} from './Editor/Components/perfiles-mujeres/perfiles-mujeres.component';
import {NoticiasComponent} from './Editor/Components/noticias/noticias.component';
import {LoginGuard} from './Login/Services/login.guard'

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
    path: 'perfiles/:id',
    component:PerfilesMujeresComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'noticias/:id',
    component:NoticiasComponent,
    canActivate:[LoginGuard]

  },
  {
    path: 'menu-publicacion',
    component:MenuPublicacionComponent,
    canActivate:[LoginGuard]

  },

  {
    path: 'admin',
    component:RegistroUsuarioComponent,
     canActivate:[LoginGuard],
    

  },
  {
    path: 'roles',
    component:RolesListComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'usuarios',
    component:UsuarioListComponent,
     canActivate:[LoginGuard]
  },
  {
    path: 'editor',
    component: MenuPrincipalEditorComponent,
    canActivate:[LoginGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
