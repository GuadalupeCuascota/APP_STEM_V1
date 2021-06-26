import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './Componets/Administrador/menu-principal/registro-usuario.component';
import { UsuarioListComponent } from './Componets/Administrador/usuario-list/usuario-list.component';
import{RegistroUsuarioService} from './Services/registro-usuario.service';
import { RegistroArchivoService } from "./Services/registro-archivo.service";
import { RolesListComponent } from './Componets/Administrador/roles-list/roles-list.component';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';//imporar modulo para animacion de mensajes de alterta 
import{ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination'; //modulo para la paginacion
import {FormsModule, ReactiveFormsModule} from '@angular/forms';// importar el módulo para enlazar el formulario con los datos
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';//importan el formulario modal
import { MenuPrincipalEditorComponent } from './Componets/Editor/menu-principal-editor/menu-principal-editor.component';
 import { LoginComponent } from './Componets/Login/login.component';
import { PerfilesMujeresComponent } from './Componets/Editor/perfiles-mujeres/perfiles-mujeres.component'
import {LoginGuard} from './Services/Login/login.guard';
import { NoticiasComponent } from './Componets/Editor/noticias/noticias.component';
import { OfertaAcademicaComponent } from './Componets/Editor/oferta-academica/oferta-academica.component';
import { MenuPublicacionComponent } from './Componets/Editor/menu-publicacion/menu-publicacion.component';
import {RegistroEditorComponent} from './Componets/Administrador/registro-editor/registro-editor.component';
import { FiltroUsuariosPipe } from './pipes/filtro-usuarios.pipe';
import { FiltroPerfilesPipe } from './pipes/filtro-perfiles.pipe'; //módulo para el filtrado de información
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
    MenuPublicacionComponent,
    RegistroEditorComponent,
    FiltroUsuariosPipe,
    OfertaAcademicaComponent,
    FiltroPerfilesPipe
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
