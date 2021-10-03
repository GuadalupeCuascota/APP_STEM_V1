import { Component, OnInit } from '@angular/core';
import { AgendarMentoria } from 'src/app/Models/agendarMentoria';
import { AgendarMentoriaService } from 'src/app/Services/agendar-mentoria.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { MensajesService } from 'src/app/Services/mensajes.service';
@Component({
  selector: 'app-mis-mentorias',
  templateUrl: './mis-mentorias.page.html',
  styleUrls: ['./mis-mentorias.page.scss'],
})
export class MisMentoriasPage implements OnInit {
  mentoriasAgendadas:any[] = [];
  constructor(private regitroAgendarMentoriaService: AgendarMentoriaService, private alertController: AlertController, private mensajeServices: MensajesService) {}
  datos: any = {};
  localTime = moment().format();
  // time1 = moment().format('h:mm a');
  // time = moment().format('h:mm a');
  ngOnInit() {
    this.getAgedamiento();
    this.datos = JSON.parse(localStorage.getItem('payload'));
    
    
  }
  getAgedamiento(){
    var UsuMentoria = [];
    this.regitroAgendarMentoriaService.getAgendarMentorias().subscribe(
      (res) => {
        console.log('las mentorias', res);
        
        for (let aux of res) {
        
          if (aux.id_usuario == this.datos.id_usuario ) {
            this.localTime = moment(aux.fecha).format('DD/MM/YYYY');
            aux.fecha=this.localTime;
         
            UsuMentoria.push(aux);
            // this.time = moment(aux.hora_inicio).format('h:mm a');
            // this.time1 = moment(aux.hora_fin).format('h:mm a');
            // aux.hora_inicio=this.time;
            // aux.hora_fin=this.time1;
           
          
            
          }
        }
        this.mentoriasAgendadas = UsuMentoria;
        console.log('generado', this.mentoriasAgendadas);
      },
      (err) => {
        console.log("el error",err);
      }
    );
  }
  async presentAlert(id) {
    console.log("el id",id)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Anular solicitud de agendamiento',

      message: '¿Decea confirmar la solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {
            console.log('Confirmar');
            this.deleteAgendamiento(id)
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  deleteAgendamiento(id:number){
    this.regitroAgendarMentoriaService.deleteAgendarMentoria(id).subscribe(
      (res) => {
        this.mensajeServices.presentToast('Mentoria eliminada correctamente');
        this.getAgedamiento();

      },
      (err)=>{
      console.log(err)
      }
    )

  }
}
