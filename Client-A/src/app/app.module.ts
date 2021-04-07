import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './Componets/Administrador/menu-principal/registro-usuario.component';
import { UsuarioListComponent } from './Componets/Administrador/usuario-list/usuario-list.component';
import{RegistroUsuarioService} from './Services/registro-usuario.service';
import { RegistroArchivoService } from "./Services/registro-archivo.service";
import { RolesListComponent } from './Componets/Administrador/roles-list/roles-list.component';


//imporar modulo para animacion de mensajes de alterta 
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';


// importar el módulo para enlazar el formulario con los datos
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';
//importan el formulario modal
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MenuPrincipalEditorComponent } from './Componets/Editor/menu-principal-editor/menu-principal-editor.component';
 import { LoginComponent } from './Componets/Login/login.component';
import { PerfilesMujeresComponent } from './Componets/Editor/perfiles-mujeres/perfiles-mujeres.component'
import {LoginGuard} from './Services/Login/login.guard';
import { NoticiasComponent } from './Componets/Editor/noticias/noticias.component';
import { MenuPublicacionComponent } from './Componets/Editor/menu-publicacion/menu-publicacion.component'
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
    ReactiveFormsModule,
    
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
