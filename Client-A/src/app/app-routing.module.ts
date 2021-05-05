import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './Components/Administrador/usuario-list/usuario-list.component';
import {RolesListComponent } from './Components/Administrador/roles-list/roles-list.component';
import { MenuPrincipalEditorComponent} from './Components/Editor/menu-principal-editor/menu-principal-editor.component';
import {MenuPublicacionComponent } from './Components/Editor/menu-publicacion/menu-publicacion.component';
import {RegistroUsuarioComponent} from './Components/Administrador/menu-principal/registro-usuario.component';
import {LoginComponent} from './Login/Components/login.component'
import {PerfilesMujeresComponent} from './Components/Editor/perfiles-mujeres/perfiles-mujeres.component';
import {NoticiasComponent} from './Components/Editor/noticias/noticias.component';
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
