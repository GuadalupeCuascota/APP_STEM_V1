import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/Models/publicacion';
import { Evento } from 'src/app/Models/evento';

import { RegistroPublicacionService } from '../../Services/registro-publicacion.service';
import { RegistroEventoService } from 'src/app/Services/registro-evento.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { SocialsharePage } from '../socialshare/socialshare.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
})
export class DetalleNoticiaPage implements OnInit {
  constructor(
    private regitroPublicacion: RegistroPublicacionService,
    private actRoute: ActivatedRoute,
    private registroEvento: RegistroEventoService,
    private socialSharing: SocialSharing,
    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    private browser: InAppBrowser,

  ) {}
  id = 0;
  API_URI = '';
  descripcion = '';
  noticia: Publicacion;
  enlace = '';
  tipo_archivo = '';
  id_publicacion=0;
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

  CimgUrl;

  ////SHARE//
  // link: string = 'https://link.medium.com/JA4amAHFJ5';
  // text: string = 'Flamenco';
  // imgurl: string =
  //   'https://dametresminutos.files.wordpress.com/2018/11/nick-fewings-532590-unsplash.jpg?w=584';
  ngOnInit() {
    this.datos = JSON.parse(localStorage.getItem('payload'));
    // this.regitroPublicacion.getPublicacion()
    const params = this.actRoute.snapshot.params;
    this.id = params.id;

    
    
    console.log('el id es', params);
    this.regitroPublicacion.getPublicacion(params.id).subscribe((res) => {
      this.noticia = res;
      console.log('la noticia detalle', this.noticia);
      this.API_URI = this.noticia.ruta_archivo;
      this.descripcion = this.noticia.descripcion;
      this.enlace = this.noticia.enlace;
      this.tipo_archivo = this.noticia.tipo_archivo;
      this.titulo = this.noticia.titulo;
      this.id_publicacion=this.noticia.id_publicacion
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
  socialS(imgUrl) {
    this.evento.id_tipo_evento = 3;
    this.evento.id_publicacion = this.id_publicacion;
    this.evento.id_usuario = this.datos.id_usuario;
    var options = {
      tittle: this.titulo,
      message: this.descripcion,
      url: imgUrl,
    };
    var onSuccess=function(result){
      console.log("Guardado Completado"+result);
    };
    var onError=function(msg){
      console.log("Guardado Completado"+msg);
    };
    this.socialSharing.shareWithOptions(options);
    this.registroEvento.saveEvento(this.id_publicacion, this.datos.id_usuario, this.evento).subscribe(
      (res) => {
       console.log("guardado")
        
      },
      (err) => {
        console.log('no se puede guardar');
      }
    );
  }

  async showShareOptions() {
    //modal para compartir con redes sociales seleccionadas
   
    const modal = await this.modalCtrl.create({
      component: SocialsharePage,
      cssClass: 'backTransparent',
      backdropDismiss: true,
    });
    return modal.present();
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
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Comparta contenido con personas cercanas',
      cssClass: 'my-custom-class',

      buttons: [
        {
          text: '',
          role: 'destructive',
          icon: 'logo-whatsapp',

          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Share',
          icon: 'logo-facebook',
          handler: () => {
            console.log('Share clicked');
          },
        },
        {
          text: 'Play (open modal)',
          icon: 'logo-twitter',
          handler: () => {
            console.log('Play clicked');
          },
        },
        {
          text: 'Favorite',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'logo-instagram',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  openUrl(url){
    this.browser.create(url,'_self')
  }
 
}
