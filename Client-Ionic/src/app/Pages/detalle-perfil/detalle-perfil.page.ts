import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Evento } from 'src/app/Models/evento';
import { Publicacion } from 'src/app/Models/publicacion';
import { RegistroEventoService } from 'src/app/Services/registro-evento.service';
import { RegistroPublicacionService } from 'src/app/Services/registro-publicacion.service';

@Component({
  selector: 'app-detalle-perfil',
  templateUrl: './detalle-perfil.page.html',
  styleUrls: ['./detalle-perfil.page.scss'],
})
export class DetallePerfilPage implements OnInit {
  id = 0;
  API_URI = '';
  descripcion = '';
  perfil: Publicacion;
  profesion = '';
  tipo_archivo = '';
  nombre_perfil = '';
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
   
  constructor(
    private regitroPublicacion: RegistroPublicacionService,
    private actRoute: ActivatedRoute,
    private registroEvento: RegistroEventoService,
    // private socialSharing: SocialSharing,
    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.datos = JSON.parse(localStorage.getItem('payload'));
    // this.regitroPublicacion.getPublicacion()
    const params = this.actRoute.snapshot.params;
    this.id = params.id;
    console.log('el id es', params);
    this.regitroPublicacion.getPublicacion(params.id).subscribe((res) => {
      this.perfil = res;
      console.log("perfil",this.perfil)
      console.log('la noticia detalle', this.perfil);
      this.API_URI = 'http://192.168.100.45:3000/' + this.perfil.ruta_archivo;
      this.descripcion = this.perfil.descripcion;
      console.log("des",this.descripcion)
      this.profesion = this.perfil.profesion;
      this.tipo_archivo = this.perfil.tipo_archivo;
       this.nombre_perfil = this.perfil.nombre_perfil;
      console.log(this.perfil);
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
