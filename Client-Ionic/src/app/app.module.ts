import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http' //importar módulo de http para realizar peticiones
import { Storage} from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import {MenuPrincipalPageModule} from './Pages/Estudiante-secundaria/menu-principal/menu-principal.module'

import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule,  IonicStorageModule.forRoot()
   ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},Storage,IonicStorageModule,StreamingMedia],
  exports:[
  MenuPrincipalPageModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
