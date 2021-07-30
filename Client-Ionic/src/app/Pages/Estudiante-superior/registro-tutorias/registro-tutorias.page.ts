import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroMentorias } from 'src/app/Models/registro-mentorias';
import { RegistroMentoriasService } from 'src/app/Services/registro-mentorias.service';
import { UsuarioService } from '../../../Services/usuario.service';
import * as moment from 'moment';

@Component({
  selector: 'app-registro-tutorias',
  templateUrl: './registro-tutorias.page.html',
  styleUrls: ['./registro-tutorias.page.scss'],
})
export class RegistroTutoriasPage implements OnInit {
  registroMentorias: any[] = [];
  usuariosM: any[] = [];
  datos: any = {};
  localTime = moment().format();
  time = moment().format();
  time1 = moment().format('h:mm a');

  constructor(
    private regitroMentoriasService: RegistroMentoriasService,
    private router: Router,
    private usuarioServices: UsuarioService
  ) {}

  ngOnInit() {
    this.doRefresh();
    this.getRegistroMentorias();
    this.datos = JSON.parse(localStorage.getItem('payload'));
    console.log('el tiempo', this.time);
  }

  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.getRegistroMentorias();
    if ($event) {
      $event.target.complete();
    }
  }

  loadData(event) {
    console.log(event, 'el evento');
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.registroMentorias.length == 9) {
        event.target.disabled = true;
        console.log('es igual');
      }
    }, 500);
  }

  getRegistroMentorias() {
    console.log('pasa get registro');
    console.log('los datos',this.datos)
    var UsuMentoria = [];
    this.regitroMentoriasService.getRegistroMentorias().subscribe(
      (res) => {
        console.log('las mentorias', res);
        for (let usu1 of res) {
          
          this.localTime = moment(usu1.fecha).format('DD/MM/YYYY');
          usu1.fecha = this.localTime;
          UsuMentoria.push(usu1);
        }
          // this.time = moment(usu1.hora_inicio).format('h:mm a');
          // this.time1 = moment(usu1.hora_fin).format('h:mm a');
          
          // usu1.hora_inicio = this.time;
          // usu1.hora_fin = this.time1;
          
        this.registroMentorias = UsuMentoria;
        console.log('segundo', (this.registroMentorias = UsuMentoria));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  detalle(id: number) {
    console.log('la publicacion', id);
    this.router.navigate(['/detalle-mentoria/', id]);
  }
 
}
