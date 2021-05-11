import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './Services/auth.guard'

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./Pages/registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
   
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'menu-principal',
    loadChildren: () => import('./Pages/Estudiante-secundaria/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'menu-principal-u',
    loadChildren: () => import('./Pages/Estudiante-superior/menu-principal-u/menu-principal-u.module').then( m => m.MenuPrincipalUPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'menu-opciones-se',
    loadChildren: () => import('./Pages/Estudiante-secundaria/menu-opciones-se/menu-opciones-se.module').then( m => m.MenuOpcionesSePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'perfiles',
    loadChildren: () => import('./Pages/perfiles/perfiles.module').then( m => m.PerfilesPageModule),
    canActivate:[AuthGuard]

  },
  
  {
    path: 'noticias',
    loadChildren: () => import('./Pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./Pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate:[AuthGuard]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
