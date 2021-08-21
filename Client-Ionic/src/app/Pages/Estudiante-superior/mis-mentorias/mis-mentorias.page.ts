import { Component, OnInit } from '@angular/core';
import { AgendarMentoria } from 'src/app/Models/agendarMentoria';
import { AgendarMentoriaService } from 'src/app/Services/agendar-mentoria.service';
import * as moment from 'moment';
@Component({
  selector: 'app-mis-mentorias',
  templateUrl: './mis-mentorias.page.html',
  styleUrls: ['./mis-mentorias.page.scss'],
})
export class MisMentoriasPage implements OnInit {
  mentoriasAgendadas:any[] = [];
  constructor(private regitroAgendarMentoriaService: AgendarMentoriaService) {}
  datos: any = {};
  localTime = moment().format();
  // time1 = moment().format('h:mm a');
  // time = moment().format('h:mm a');
  ngOnInit() {
    
    this.datos = JSON.parse(localStorage.getItem('payload'));
    console.log('listado registro');
    var UsuMentoria = [];
    this.regitroAgendarMentoriaService.getAgendarMentorias().subscribe(
      (res) => {
        console.log('las mentorias', res);
        
        for (let aux of res) {
        
          if (aux.id_usuario == this.datos.id_usuario ) {
            this.localTime = moment(aux.fecha).format('DD/MM/YYYY');
            // this.time = moment(aux.hora_inicio).format('h:mm a');
            // this.time1 = moment(aux.hora_fin).format('h:mm a');
            // aux.hora_inicio=this.time;
            // aux.hora_fin=this.time1;
            aux.fecha=this.localTime;
         
            UsuMentoria.push(aux);
          
            
          }
        }
        this.mentoriasAgendadas = UsuMentoria;
        console.log('generado', this.mentoriasAgendadas);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
