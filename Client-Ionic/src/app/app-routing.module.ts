import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './Services/auth.guard'


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'menu-opciones',
    loadChildren: () => import('./Pages/Estudiante-superior/menu-opciones/menu-opciones.module').then( m => m.MenuOpcionesPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./Pages/Estudiante-superior/menu-tabs1/menu-tabs1.module').then( m => m.MenuTabs1PageModule)
  },
  {
    path: 'mi-perfil/:id',
    loadChildren: () => import('./Pages/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
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
    path: 'test-aptitud',
    loadChildren: () => import('./Pages/Estudiante-secundaria/test-aptitud/test-aptitud.module').then( m => m.TestAptitudPageModule)
  },
 
  

  {
    path: 'menu-opciones-se',
    loadChildren: () => import('./Pages/Estudiante-secundaria/menu-opciones-se/menu-opciones-se.module').then( m => m.MenuOpcionesSePageModule),
    canActivate:[AuthGuard]
  }, 
  {
    path: 'menu-principal',
    loadChildren: () => import('./Pages/Estudiante-secundaria/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule),
    canActivate:[AuthGuard]
   
  },
  




  {
    path: 'perfiles',
    loadChildren: () => import('./Pages/perfiles/perfiles.module').then( m => m.PerfilesPageModule),
  },  
  
  // {
  //   path: 'noticias',
  //   loadChildren: () => import('./Pages/noticias/noticias.module').then( m => m.NoticiasPageModule),
  // }, 
    {
    path: 'oferta-academica',
    loadChildren: () => import('./Pages/Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
  },
  {
    path: 'oferta-academica/:id/:nombre_carrera',
    loadChildren: () => import('./Pages/Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
  },
  //  {
  //   path: 'home-superior',
  //   loadChildren: () => import('./Pages/Estudiante-superior/home-superior/home-superior.module').then( m => m.HomeSuperiorPageModule)
  // }, 

  
  // {
  //   path: 'malla-curricular',
  //   loadChildren: () => import('./Pages/Estudiante-superior/malla-curricular/malla-curricular.module').then( m => m.MallaCurricularPageModule)
  // },
  


  // {
  //   path: 'oferta-academica',
  //   loadChildren: () => import('./Pages/Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
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
  
  {
    path: 'detalle-noticia/:id',
    loadChildren: () => import('./Pages/detalle-noticia/detalle-noticia.module').then( m => m.DetalleNoticiaPageModule)
  },
  
  {
    path: 'registro-tutorias',
    loadChildren: () => import('./Pages/Estudiante-superior/registro-tutorias/registro-tutorias.module').then( m => m.RegistroTutoriasPageModule)
  },
  {
    path: 'detalle-mentoria/:id',
    loadChildren: () => import('./Pages/Estudiante-superior/detalle-mentoria/detalle-mentoria.module').then( m => m.DetalleMentoriaPageModule)
  },
  {
    path: 'agendar-mentoria/:id',
    loadChildren: () => import('./Pages/Estudiante-superior/agendar-mentoria/agendar-mentoria.module').then( m => m.AgendarMentoriaPageModule)
  },
  {
    path: 'mis-mentorias',
    loadChildren: () => import('./Pages/Estudiante-superior/mis-mentorias/mis-mentorias.module').then( m => m.MisMentoriasPageModule)
  },
  {
    path: 'recuperar-contrasenia',
    loadChildren: () => import('./Pages/recuperar-contrasenia/recuperar-contrasenia.module').then( m => m.RecuperarContraseniaPageModule)
  },
  {
    path: 'cambiar-contrasenia/:id',
    loadChildren: () => import('./Pages/cambiar-contrasenia/cambiar-contrasenia.module').then( m => m.CambiarContraseniaPageModule)
  },
  {
    path: 'publicar-contenido',
    loadChildren: () => import('./Pages/publicar-contenido/publicar-contenido.module').then( m => m.PublicarContenidoPageModule)
  },
  {
    path: 'socialshare',
    loadChildren: () => import('./Pages/socialshare/socialshare.module').then( m => m.SocialsharePageModule)
  },
  {
    path: 'detalle-perfil/:id',
    loadChildren: () => import('./Pages/detalle-perfil/detalle-perfil.module').then( m => m.DetallePerfilPageModule)
  },  {
    path: 'resultado-test-aptitud',
    loadChildren: () => import('./Pages/Estudiante-secundaria/resultado-test-aptitud/resultado-test-aptitud.module').then( m => m.ResultadoTestAptitudPageModule)
  },


 



  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
