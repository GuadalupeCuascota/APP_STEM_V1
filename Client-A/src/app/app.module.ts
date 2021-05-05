import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './Components/Administrador/menu-principal/registro-usuario.component';
import { UsuarioListComponent } from './Components/Administrador/usuario-list/usuario-list.component';
import{RegistroUsuarioService} from './Service/registro-usuario.service';
import { RegistroArchivoService } from "./Service/registro-archivo.service";
import { RolesListComponent } from './Components/Administrador/roles-list/roles-list.component';


//imporar modulo para animacion de mensajes de alterta 
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';


// importar el módulo para enlazar el formulario con los datos
import {FormsModule} from '@angular/forms';
import { from } from 'rxjs';
//importan el formulario modal
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MenuPrincipalEditorComponent } from './Components/Editor/menu-principal-editor/menu-principal-editor.component';
 import { LoginComponent } from './Login/Components/login.component';
import { PerfilesMujeresComponent } from './Components/Editor/perfiles-mujeres/perfiles-mujeres.component'
import {LoginGuard} from './Login/Services/login.guard';
import { NoticiasComponent } from './Components/Editor/noticias/noticias.component';
import { MenuPublicacionComponent } from './Components/Editor/menu-publicacion/menu-publicacion.component'
// import {TokenInterceptorService} from './Login/Services/token-interceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    UsuarioListComponent,
    RolesListComponent,
  
    MenuPrincipalEditorComponent,
  
   
   LoginComponent,
  
   
   PerfilesMujeresComponent,
  
   
   NoticiasComponent,
  
   
   MenuPublicacionComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgbModule

   

  ],
  //agreagr un proveedor para utilizar en cualquier clase
  providers: [RegistroUsuarioService, RegistroArchivoService,LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
