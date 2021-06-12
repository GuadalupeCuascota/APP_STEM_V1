import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/Services/loading.service';
import {AutenticacionService} from '../../../Services/autenticacion.service'

@Component({
  selector: 'app-menu-opciones-se',
  templateUrl: './menu-opciones-se.page.html',
  styleUrls: ['./menu-opciones-se.page.scss'],
})
export class MenuOpcionesSePage implements OnInit {
  datos: any = {};
  constructor(private autenticacion:AutenticacionService,
    private loadinServices: LoadingService) { }

  ngOnInit() {
    console.log("PRIMERO")
    this.datos=JSON.parse(localStorage.getItem('payload'));
    
  }
  async logout(){
    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();
    this.autenticacion.logOut();
  }
}
