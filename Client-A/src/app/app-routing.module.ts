import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './Componets/Administrador/usuario-list/usuario-list.component';
import {RolesListComponent } from './Componets/Administrador/roles-list/roles-list.component';
import { MenuPrincipalEditorComponent} from './Componets/Editor/menu-principal-editor/menu-principal-editor.component';
import {MenuPublicacionComponent } from './Componets/Editor/menu-publicacion/menu-publicacion.component';
import {RegistroUsuarioComponent} from './Componets/Administrador/menu-principal/registro-usuario.component';
import {LoginComponent} from './Componets/Login/login.component'
import {PerfilesMujeresComponent} from './Componets/Editor/perfiles-mujeres/perfiles-mujeres.component';
import {NoticiasComponent} from './Componets/Editor/noticias/noticias.component';
import {LoginGuard} from './Services/Login/login.guard'

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
