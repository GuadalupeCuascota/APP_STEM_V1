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
    path: 'menu-opciones-se',
    loadChildren: () => import('./Pages/Estudiante-secundaria/menu-opciones-se/menu-opciones-se.module').then( m => m.MenuOpcionesSePageModule),
    canActivate:[AuthGuard]
  },   {
    path: 'menu-opciones-u',
    loadChildren: () => import('./Pages/Estudiante-superior/menu-opciones-u/menu-opciones-u.module').then( m => m.MenuOpcionesUPageModule),
    
  },  {
    path: 'registro',
    loadChildren: () => import('./Pages/Estudiante-superior/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'malla-curricular',
    loadChildren: () => import('./Pages/Estudiante-superior/malla-curricular/malla-curricular.module').then( m => m.MallaCurricularPageModule)
  },

 
   // {
  //   path: 'menu-principal',
  //   loadChildren: () => import('./Pages/Estudiante-secundaria/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule),
   
  // },
  // {
  //   path: 'perfiles',
  //   loadChildren: () => import('./Pages/perfiles/perfiles.module').then( m => m.PerfilesPageModule),
  //   // canActivate:[AuthGuard]

  // },
  
  // {
  //   path: 'noticias',
  //   loadChildren: () => import('./Pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  // },
  // {
  //   path: 'inicio',
  //   loadChildren: () => import('./Pages/inicio/inicio.module').then( m => m.InicioPageModule),
  //   canActivate:[AuthGuard]
  // },
  // {
  //   path: 'oferta-academica',
  //   loadChildren: () => import('./Pages/Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
  // },
  // {
  //   path: 'test-aptitud',
  //   loadChildren: () => import('./Pages/Estudiante-secundaria/test-aptitud/test-aptitud.module').then( m => m.TestAptitudPageModule)
  // },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
