import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegistroMentorias } from 'src/app/Models/registro-mentorias';
import { LoadingService } from 'src/app/Services/loading.service';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { RegistroMentoriasService } from 'src/app/Services/registro-mentorias.service';

@Component({
  selector: 'app-detalle-mentoria',
  templateUrl: './detalle-mentoria.page.html',
  styleUrls: ['./detalle-mentoria.page.scss'],
})
export class DetalleMentoriaPage implements OnInit {
  status:''
  usuariosMentorias:RegistroMentorias []=[];

  formGroup: FormGroup;
  constructor(private regitroMentoriasService: RegistroMentoriasService,private actRoute: ActivatedRoute,private mensajeServices: MensajesService,private loadinServices: LoadingService,) { }

  async ngOnInit() {
    var usuAE = [];
 
    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();
    const params=this.actRoute.snapshot.params
    if(params && params.id){
      this.regitroMentoriasService.getRegistroMentoriasUsuario(params.id).subscribe(res => {
      usuAE.push(res);
      this.usuariosMentorias=usuAE
      console.log("detallen",res)
      
        },
        () => {
          loading.dismiss();
          this.mensajeServices.presentAlert('Error', 'Hubo un problema al actualizar su información')
        }
        );
    }else{
    
    }

  }
  







  //   var usuAE = [];
  //   console.log("pasa aqui")
  //   const params=this.actRoute.snapshot.params;
  //   console.log("el id es",params)
  //   this.regitroMentoriasService.getRegistroMentoriasUsuario(params.id).subscribe(res=>{
  //   console.log("mentoriasss agendas",res)
  //   usuAE.push(res);
  //   this.usuariosMentorias=usuAE
  //   },
  //   err=>{
  //   console.log( "el error es",err)
  //   this.status=err.error.text
   

  //   })
  // }
  
}
