import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/Models/publicacion';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { LoadingService } from 'src/app/Services/loading.service';
import {RegistroPublicacionService} from '../../Services/registro-publicacion.service'
// import { StreamingMedia,StreamingAudioOptions,StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';


@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.page.html',
  styleUrls: ['./perfiles.page.scss'],
})
export class PerfilesPage implements OnInit {


  constructor(private regitroPublicacion: RegistroPublicacionService) { }//inyecto el servicio importado

  ngOnInit() {
    this.getPerfiles();
    
  }
 perfiles: Publicacion[] = [];
 perfil: Publicacion;

 loadData(event) {
   console.log(event,"el evento")
  setTimeout(() => {
    console.log('Done');
    event.target.complete();

  
    if (this.perfiles.length ==9) {
      event.target.disabled = true;
      console.log("es igual")
    }
  }, 500);
}
 getPerfiles(){
   var auxper=[];
   this.regitroPublicacion.getUsuarios().subscribe(res=>{
     for(let aux of res){
       if(aux.id_tipo_publicacion==1){
         auxper.push(aux);
       }
     }
   
    this.perfiles=auxper;
    console.log("perfiles",this.perfiles)
   },
   err=>{
 console.log(err)
   })
 }
//  startVideo(){
//   console.log("pasa")
//   let options: StreamingVideoOptions = {
//     successCallback: () => { console.log('Video played') },
//     errorCallback: (e) => { console.log('Error streaming') },
//     orientation: 'landscape',
//     shouldAutoClose: true,
//     controls: false
//   };
//   this.streamingMedia.playVideo('http://localhost:3000/uploads//pregunta%20a.mp4', options);
//  }
startAudio(){

}
stopAudio(){

}


}
