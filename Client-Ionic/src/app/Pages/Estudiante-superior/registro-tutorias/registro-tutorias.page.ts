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
  mensaje = '';
altert:boolean=false
  constructor(
    private regitroMentoriasService: RegistroMentoriasService,
    private router: Router,
    private usuarioServices: UsuarioService
  ) {}

  ngOnInit() {
    this.doRefresh();
    this.getRegistroMentorias();
    this.datos = JSON.parse(localStorage.getItem('payload'));
    console.log('el dato', this.datos);
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
    var UsuMentoria = [];
    this.regitroMentoriasService.getRegistroMentorias().subscribe(
      (res) => {
        console.log('las mentorias', res);
        for (let usu1 of res) {
          this.localTime = moment(usu1.fecha).format('DD/MM/YYYY');
          if (usu1.carrera == this.datos.carrera) {
            usu1.fecha = this.localTime;
            UsuMentoria.push(usu1);
          }
          
        }
      console.log("el tamaño",UsuMentoria)
      if(UsuMentoria.length>0)
        {
          this.registroMentorias = UsuMentoria;
        }else{
          this.mensaje="No existe mentorias disponibles"
          this.altert=true
          console.log("alert",this.altert)
        }
       

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
