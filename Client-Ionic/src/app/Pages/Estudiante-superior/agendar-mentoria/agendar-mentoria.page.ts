import { Component, OnInit } from '@angular/core';
import {AgendarMentoriaService } from 'src/app/Services/agendar-mentoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { LoadingService } from 'src/app/Services/loading.service';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { AgendarMentoria } from 'src/app/Models/agendarMentoria';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-agendar-mentoria',
  templateUrl: './agendar-mentoria.page.html',
  styleUrls: ['./agendar-mentoria.page.scss'],
})
export class AgendarMentoriaPage implements OnInit {
  datos: any = {};
  agendarMentoria:AgendarMentoria={
    id_registro_mentoria:0,
    id_estado_agen_mentoria:2,
    observacion:'',
    id_usuario:0,
    fecha:'',
    nombre:'',
    apellido:'',
    hora_inicio:'',
    hora_fin:'',
  }
   params=this.actRoute.snapshot.params
  constructor(private regitroAgendarMentoriaService: AgendarMentoriaService,private actRoute: ActivatedRoute,private mensajeServices: MensajesService,private loadinServices: LoadingService,private router: Router, private navController: NavController) { }

  ngOnInit() {
  this.saveAgendarMentoria();
  }
  
 
  async saveAgendarMentoria(){
    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();
    this.datos=JSON.parse(localStorage.getItem('payload'));
    console.log(this.datos.id_usuario)
    console.log(this.params.id)
    this.agendarMentoria.id_registro_mentoria=this.params.id;
    this.agendarMentoria.id_usuario=this.datos.id_usuario;
   
    
    
     console.log("el registro",this.agendarMentoria)
    this.regitroAgendarMentoriaService.saveAgendarMentoria(this.agendarMentoria).subscribe(res=>{
      this.mensajeServices.presentToast("Mentoria Agendada correctamente");
      this.navController.back();
    },
    ()=>{
      loading.dismiss();
        this.mensajeServices.presentAlert('Error', 'Hubo un problema al guardar')
    
    }
    )
  }
  
}
