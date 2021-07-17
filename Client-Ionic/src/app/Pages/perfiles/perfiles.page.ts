import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/Models/publicacion';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { RegistroPublicacionService } from '../../Services/registro-publicacion.service';
import {
  StreamingMedia,
  StreamingVideoOptions,
  StreamingAudioOptions,
} from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.page.html',
  styleUrls: ['./perfiles.page.scss'],
})
export class PerfilesPage implements OnInit {
  perfiles: Publicacion[] = [];
  textoBuscar = '';
  tipoarchivo = false;
  tipovideo = 'video/mp4';
  tipoimagen = 'imagen/jpeg';
  constructor(
    private regitroPublicacion: RegistroPublicacionService,
    private streamingMedia: StreamingMedia
  ) {} //inyecto el servicio importado

  ngOnInit() {
    this.getPerfiles();

    this.doRefresh();
  }
  buscar(event) {
    this.textoBuscar = event.detail.value;
    console.log(event);
  }
  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.getPerfiles();
    if ($event) {
      $event.target.complete();
    }
  }

   playVideo(url: any) {
    console.log('PASS');
    var options: StreamingVideoOptions = {
      successCallback: () => {
        console.log('Video played');
      },
      errorCallback: (e) => {
        console.log('Error streaming');
      },
      orientation: 'portrait', //fuerza una orientacion del video
      controls: true, //el video debe tener controles
      shouldAutoClose: true, //cierra el video despues de que termine
    };

    this.streamingMedia.playVideo('http://192.168.100.45:3000/' + url, options);
    console.log('LA URL', 'http://192.168.100.45:3000/' + url);
  }
  // public start(){

  //   var optionsA: StreamingAudioOptions={
  //     successCallback: () => { console.log('Video played') },
  //       errorCallback: (e) => { console.log('Error streaming') },
  //     bgColor: "#F39C12",
  //     initFullscreen:true
  //   }
  //   this.streamingMedia.playAudio('http://192.168.100.10:3000/uploads/0cc4e65d-0997-40ae-918f-dd4a6668aa85.mp4',optionsA)
  // }

  stopPlayingVideo() {
    this.streamingMedia.pauseAudio();
  }

  perfil: Publicacion;

  loadData(event) {
    console.log(event, 'el evento');
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      if (this.perfiles.length == 9) {
        event.target.disabled = true;
        console.log('es igual');
      }
    }, 500);
  }
  getPerfiles() {
    var auxper = [];
    this.regitroPublicacion.getpublicaciones().subscribe(
      (res) => {
        console.log(res);
        for (let aux of res) {
          // console.log('tipo', tipo, aux.id_tipo_publicacion);
          if (aux.id_tipo_publicacion == 1) {
            auxper.push(aux);
          }
        }

        this.perfiles = auxper;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  startAudio() {}
  stopAudio() {}
}
