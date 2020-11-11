import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './Administrador/Components/registro-usuario/registro-usuario.component';
import { UsuarioListComponent } from './Administrador/Components/usuario-list/usuario-list.component';

import{RegistroUsuarioService} from './Administrador/Services/registro-usuario.service'

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    UsuarioListComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  //agreagr un proveedor
  providers: [RegistroUsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
