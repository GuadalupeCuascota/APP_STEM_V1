import { Component, OnInit } from '@angular/core';

import {
  StreamingMedia,
  StreamingVideoOptions,
  
} from '@ionic-native/streaming-media/ngx';

import { Carreras } from 'src/app/Models/carreras-fica';
import { RegistroCarrerasService } from '../../../Services/registro-carreras.service';
@Component({
  selector: 'app-carreras-fica',
  templateUrl: './carreras-fica.page.html',
  styleUrls: ['./carreras-fica.page.scss'],
})
export class CarrerasFicaPage implements OnInit {
  carreras: Carreras[] = [];
  textoBuscar = '';
  tipoarchivo=false;
  isLoaded=false;
  carrera: Carreras;
  datos: any = {};
  constructor(private registroCarreras: RegistroCarrerasService, private streamingMedia: StreamingMedia) { }

  ngOnInit() {
    this.datos=JSON.parse(localStorage.getItem('payload'));
    this.getCarreras();
    this.doRefresh();
  }
  buscar(event) {
    this.textoBuscar = event.detail.value;
    console.log(event);
  }
  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.getCarreras();
    if ($event) {
      $event.target.complete();
    }
  }
 
 async playVideo(url:any) {

    console.log('PASS');
    var options:StreamingVideoOptions = {
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

    this.streamingMedia.playVideo('http://192.168.100.10:3000/' + url, options);
    console.log('LA URL', 'http://192.168.100.10:3000/' + url);
  }
  
  stopPlayingVideo() {
    this.streamingMedia.pauseAudio();
  }

 

 
  getCarreras() {
    var auxper = [];
    this.registroCarreras.getCarreras().subscribe(
      (res) => {
        for (let aux of res) {
          if (aux.id_carrera != 1) {
            auxper.push(aux);
          }
        }
        this.carreras =auxper;
        this.isLoaded=true;

      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  startAudio() {}
  stopAudio() {}
}