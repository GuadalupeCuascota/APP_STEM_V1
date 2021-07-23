import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/Services/loading.service';
import {AutenticacionService} from '../../../Services/autenticacion.service'
@Component({
  selector: 'app-menu-opciones',
  templateUrl: './menu-opciones.page.html',
  styleUrls: ['./menu-opciones.page.scss'],
})
export class MenuOpcionesPage implements OnInit {
  datos: any = {};
  constructor(private autenticacion:AutenticacionService,
    private loadinServices: LoadingService) { }

  ngOnInit() {
    this.datos=JSON.parse(localStorage.getItem('payload'));
    console.log("hola estudiante superior",this.datos)
    console.log("HOLLL")
  }
  async logout(){
    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();
    this.autenticacion.logOut();
  }

}
