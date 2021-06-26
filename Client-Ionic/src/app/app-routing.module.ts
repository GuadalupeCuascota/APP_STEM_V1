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
  },  
  {
    path: 'perfiles',
    loadChildren: () => import('./Pages/perfiles/perfiles.module').then( m => m.PerfilesPageModule),
  },  
  
  {
    path: 'noticias',
    loadChildren: () => import('./Pages/noticias/noticias.module').then( m => m.NoticiasPageModule),
  }, 
    {
    path: 'oferta-academica',
    loadChildren: () => import('./Pages/Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
  },
  {
    path: 'oferta-academica/:id',
    loadChildren: () => import('./Pages/Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
  },
  {
    path: 'home-secundaria',
    loadChildren: () => import('./Pages/Estudiante-secundaria/home-secundaria/home-secundaria.module').then( m => m.HomeSecundariaPageModule)
  },

  
  // {
  //   path: 'malla-curricular',
  //   loadChildren: () => import('./Pages/Estudiante-superior/malla-curricular/malla-curricular.module').then( m => m.MallaCurricularPageModule)
  // },
  
  //  {
  //   path: 'menu-principal',
  //   loadChildren: () => import('./Pages/Estudiante-secundaria/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule),
   
  // },

  // {
  //   path: 'oferta-academica',
  //   loadChildren: () => import('./Pages/Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
  // },
  // {
  //   path: 'menu-opciones',
  //   loadChildren: () => import('./Pages/Estudiante-superior/menu-opciones/menu-opciones.module').then( m => m.MenuOpcionesPageModule)
  // },
  // {
  //   path: 'menu',
  //   loadChildren: () => import('./Pages/menu/menu.module').then( m => m.MenuPageModule)
  // },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./Pages/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
  },
  {
    path: 'carreras-fica',
    loadChildren: () => import('./Pages/Estudiante-secundaria/carreras-fica/carreras-fica.module').then( m => m.CarrerasFicaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
