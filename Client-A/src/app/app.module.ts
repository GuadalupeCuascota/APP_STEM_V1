import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './Administrador/Components/menu-principal/registro-usuario.component';
import { UsuarioListComponent } from './Administrador/Components/usuario-list/usuario-list.component';
import{RegistroUsuarioService} from './Administrador/Services/registro-usuario.service';
import { RolesListComponent } from './Administrador/Components/roles-list/roles-list.component';
//imporar modulo para animacion de mensajes de alterta 
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';


// importar el módulo para enlazar el formulario con los datos
import {FormsModule} from '@angular/forms';
import { from } from 'rxjs';
//importan el formulario modal
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MenuPrincipalEditorComponent } from './Editor/Components/menu-principal-editor/menu-principal-editor.component';
 import { LoginComponent } from './Login/Components/login/login.component';
import { PerfilesMujeresComponent } from './Editor/Components/perfiles-mujeres/perfiles-mujeres.component'


@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    UsuarioListComponent,
    RolesListComponent,
  
    MenuPrincipalEditorComponent,
  
   
   LoginComponent,
  
   
   PerfilesMujeresComponent
   
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
  //agreagr un proveedor
  providers: [RegistroUsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
