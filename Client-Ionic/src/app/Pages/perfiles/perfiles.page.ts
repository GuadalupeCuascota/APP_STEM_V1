import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/Models/publicacion';
// import 'rxjs/add/operator/map';


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
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.page.html',
  styleUrls: ['./perfiles.page.scss'],
})
export class PerfilesPage implements OnInit {
  isSeeMore:boolean=false;
  id_perfil=0
  perfiles: Publicacion[] = [];
  textoBuscar = '';
  tipoarchivo = false;
  tipovideo = 'video/mp4';
  tipoimagen = 'imagen/jpeg';
  datos: any = {};
  valueSelected:string="perfiles"

  /////YOUTUBE-API/////
  idcanal:string='UCS1EzRQqzi03AEYWSFMER_Q';
 
  maxRes:string='70+30';
  googleToken:string='AIzaSyAIyv-RhbPIbXTIZrhA-aMR-4OsRBgFRTk';
  post:any=[];
  posts:any=[];
  search:string='Women in STEM'
  playlistId="PL43UVswQuVDMrDJJvzbnnKco1CoJJhZMK"
  MQcI6zKT7S8

  constructor(
    
    private regitroPublicacion: RegistroPublicacionService,
    private streamingMedia: StreamingMedia,
    private router: Router,
  ) {
    // let url="https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId="+this.idcanal+"&q="+this.search+"&type=video&order=date&maxResults="+this.maxRes+"&key="+this.googleToken;  
   
    let url ="https://www.googleapis.com/youtube/v3/playlistItems?key="+this.googleToken+"&playlistId="+this.playlistId+"&part=snippet,id&maxResults=50"
    
    // let url='https://www.googleapis.com/youtube/v3/playlistItems?part=id,snippet&channelId='+this.idcanal+'& playlistId='+this.playlistId+'&type=video&order=date&maxResults='+this.maxRes+'&key='+this.googleToken;
    this.regitroPublicacion.getPost(url).subscribe(
      (res) => {
        this.post=res;
        console.log("LA RESPUESTA",this.post.items);
      this.posts=this.post.items
        
       
      },
      (err) => {
        console.log(err);
      }
    );

    // this.httpClient.get(url).subscribe(res=>res.subscribe(data=> {
    //   this.post=this.post.concat(data.items);
    //   console.log("el post")
    
  } //inyecto el servicio importado

  ngOnInit() {
    this.getPerfiles();
    this.doRefresh();
    this.datos=JSON.parse(localStorage.getItem('payload'));
    console.log(this.datos.nivel_academico)
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
  segmenntChange(event:any){
    this.valueSelected=event.detail.value
  console.log(this.valueSelected)
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
  mostrar(id: number){
    console.log('la publicacion', id);
    this.router.navigate(['/detalle-perfil/', id]);
     
  }
}