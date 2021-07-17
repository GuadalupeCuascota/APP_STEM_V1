import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './Componets/Administrador/usuario-list/usuario-list.component';
import { RolesListComponent } from './Componets/Administrador/roles-list/roles-list.component';
import { MenuPrincipalEditorComponent } from './Componets/Editor/menu-principal-editor/menu-principal-editor.component';
import { MenuPublicacionComponent } from './Componets/Editor/menu-publicacion/menu-publicacion.component';
import { RegistroUsuarioComponent } from './Componets/Administrador/menu-principal/registro-usuario.component';
import { LoginComponent } from './Componets/Login/login.component';
import { PerfilesMujeresComponent } from './Componets/Editor/perfiles-mujeres/perfiles-mujeres.component';
import { NoticiasComponent } from './Componets/Editor/noticias/noticias.component';
import { RegistroMentoriasComponent } from './Componets/Editor/registro-mentorias/registro-mentorias.component';
import {OfertaAcademicaComponent } from './Componets/Editor/oferta-academica/oferta-academica.component';
import { LoginGuard } from './Services/Login/login.guard';
import {RolesGuard} from './Services/Login/roles.guard';
import {IsEditorGuard} from './Services/Login/is-editor.guard'
import { RegistroEditorComponent } from './Componets/Administrador/registro-editor/registro-editor.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'perfiles/:id',
    component: PerfilesMujeresComponent,
    canActivate: [LoginGuard,IsEditorGuard],
  },
  {
    path: 'noticias/:id',
    component: NoticiasComponent,
    canActivate: [LoginGuard,IsEditorGuard],
  },
  {
    path: 'registro-mentorias',
    component: RegistroMentoriasComponent,
    canActivate: [LoginGuard,IsEditorGuard],
  },
  {
    path: 'oferta-academica/:id',
    component: OfertaAcademicaComponent,
    canActivate: [LoginGuard,IsEditorGuard],
   
  },

  {
    path: 'menu-publicacion',
    component: MenuPublicacionComponent,
    canActivate: [LoginGuard,IsEditorGuard],
  
  },

  {
    path: 'admin',
    component: RegistroUsuarioComponent,
    canActivate: [LoginGuard,RolesGuard],
    
  },
  {
    path: 'roles',
    component: RolesListComponent,
    canActivate: [LoginGuard,RolesGuard],
  },
  {
    path: 'usuarios',
    component: UsuarioListComponent,
    canActivate: [LoginGuard,RolesGuard],
  },
  {
    path: 'editor',
    component: MenuPublicacionComponent,
    canActivate: [LoginGuard,IsEditorGuard],
  },
  {
    path: 'registro-editor',
    component: RegistroEditorComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
