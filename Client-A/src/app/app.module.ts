import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './Administrador/Components/menu-principal/registro-usuario.component';
import { UsuarioListComponent } from './Administrador/Components/usuario-list/usuario-list.component';
import{RegistroUsuarioService} from './Administrador/Services/registro-usuario.service';
import { RolesListComponent } from './Administrador/Components/roles-list/roles-list.component';
//imporar modulo para animacion de mensajes de alterta 
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ToastrModule} from 'ngx-toastr';
// importar el módulo para enlazar el formulario con los datos
import {FormsModule} from '@angular/forms';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    UsuarioListComponent,
    RolesListComponent, 
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  //agreagr un proveedor
  providers: [RegistroUsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
