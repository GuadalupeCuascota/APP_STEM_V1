import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/Models/publicacion';
import { Evento } from 'src/app/Models/evento';

import { RegistroPublicacionService } from '../../Services/registro-publicacion.service';
import { RegistroEventoService } from 'src/app/Services/registro-evento.service';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
})
export class DetalleNoticiaPage implements OnInit {
  constructor(
    private regitroPublicacion: RegistroPublicacionService,
    private actRoute: ActivatedRoute,
    private registroEvento: RegistroEventoService
  ) {}
  id = 0;
  API_URI = '';
  descripcion = '';
  noticia: Publicacion;
  enlace = '';
  tipo_archivo = '';
  titulo = '';
  selectedTab = '';
  evento: Evento = {
    id_evento: 0,
    id_tipo_evento: 0,
    id_publicacion: 0,
    id_usuario: 0,
    fecha_evento: new Date(),
  };
  datos: any = {};
  respuesta: any = {};
  ngOnInit() {
    this.datos = JSON.parse(localStorage.getItem('payload'));
    // this.regitroPublicacion.getPublicacion()
    const params = this.actRoute.snapshot.params;
    this.id = params.id;
    console.log('el id es', params);
    this.regitroPublicacion.getPublicacion(params.id).subscribe((res) => {
      this.noticia = res;
      console.log('la noticia detalle', this.noticia);
      this.API_URI = 'http://192.168.100.45:3000/' + this.noticia.ruta_archivo;
      this.descripcion = this.noticia.descripcion;
      this.enlace = this.noticia.enlace;
      this.tipo_archivo = this.noticia.tipo_archivo;
      this.titulo = this.noticia.titulo;
      console.log(this.noticia);
    });

    this.evento.id_usuario = this.datos.id_usuario;
    this.registroEvento
      .getEvento(this.id, this.datos.id_usuario)
      .subscribe((res) => {
        if (res) {
          this.respuesta = res;
          console.log('res', this.respuesta.text);
          if (this.respuesta.text == 'ya existe') {
            console.log('pasa heart');
            this.selectedTab = 'heart';
          } else {
            if (this.respuesta.text == 'No existe') {
              console.log('pasa heart out');
              this.selectedTab = 'heart-outline';
            }
          }
        }
      });
  }

  buscar(id_publicacion) {
    this.evento.id_tipo_evento = 1;
    this.evento.id_publicacion = id_publicacion;
    this.evento.id_usuario = this.datos.id_usuario;
    this.registroEvento
      .getEvento(id_publicacion, this.datos.id_usuario)
      .subscribe(
        (res) => {
          if (res) {
            this.respuesta = res;
            console.log(this.respuesta.text);
            if (this.respuesta.text == 'ya existe') {
              this.selectedTab = 'heart-outline';
              this.registroEvento
                .deleteEvento(id_publicacion, this.datos.id_usuario)
                .subscribe(
                  (res) => {
                    this.selectedTab = 'heart-outline';
                    if (res) {
                      console.log('borrado');
                    }
                  },
                  () => {
                    console.log('error');
                  }
                );
            } else {
              this.registroEvento
                .saveEvento(id_publicacion, this.datos.id_usuario, this.evento)
                .subscribe(
                  (res) => {
                    if (res) {
                      this.selectedTab = 'heart';
                      console.log('like');
                    }
                  },
                  () => {
                    console.log('error');
                  }
                );
            }
          }
        },
        (err) => {
          console.log('hubo un error');
        }
      );
  }
}
