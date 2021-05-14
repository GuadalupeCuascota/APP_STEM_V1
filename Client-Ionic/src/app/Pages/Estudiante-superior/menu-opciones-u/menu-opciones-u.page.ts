import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/Services/autenticacion.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-menu-opciones-u',
  templateUrl: './menu-opciones-u.page.html',
  styleUrls: ['./menu-opciones-u.page.scss'],
})
export class MenuOpcionesUPage implements OnInit {
  datos: any = {};
  constructor(private autenticacion:AutenticacionService, 
    private loadinServices: LoadingService) { }

  ngOnInit() {
    this.datos=JSON.parse(localStorage.getItem('payload'));
    console.log("hola estudiante universitarioG",this.datos)
  }
  async logout(){
    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();
    this.autenticacion.logOut();
  }

}
