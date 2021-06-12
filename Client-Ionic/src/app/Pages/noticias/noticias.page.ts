import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/Models/publicacion';
import {RegistroPublicacionService} from '../../Services/registro-publicacion.service'
import {RegistroEventoService} from '../../Services/registro-evento.service'
import { Evento } from 'src/app/Models/evento';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  noticias: Publicacion[] = [];
  evento: Evento={
    id_evento:0,
    id_tipo_evento: 0,
    id_publicacion:0,
    id_usuario:0,
    fecha_evento:new Date(),
  }
  id_tipo_evento= 2;
  datos: any = {};
 
  constructor(private regitroPublicacion: RegistroPublicacionService, private registroEvento:RegistroEventoService) { }

  ngOnInit() {
    this.getNoticias();
    this.doRefresh();
    this.datos=JSON.parse(localStorage.getItem('payload'));
  }
  doRefresh($event?:any){ //envia un evento opcional de tipo any
    this.getNoticias();
    if($event){
      $event.target.complete();
    }

  }
  
  loadData(event) {
    console.log(event,"el evento")
   setTimeout(() => {
     console.log('Done');
     event.target.complete();
 
   
     if (this.noticias.length ==9) {
       event.target.disabled = true;
       console.log("es igual")
     }
   }, 500);
 }
 getNoticias(){
  var auxnot=[];
  this.regitroPublicacion.getUsuarios().subscribe(res=>{
    for(let aux of res){
      if(aux.id_tipo_publicacion==2){
        auxnot.push(aux);
      }
    }
  
   this.noticias=auxnot;
   console.log("noticias",this.noticias)
  },
  err=>{
console.log(err)
  })
}
Meinteresa(id_publicacio){
console.log("el id",id_publicacio)
 this.evento.id_tipo_evento=1
 this.evento.id_publicacion=id_publicacio
 this.evento.id_usuario=this.datos.id_usuario
this.registroEvento.saveEvento(this.evento).subscribe(res => {
 
  if (res) {
    
    console.log("usuario guardado")
  }

},
  () => {
    
    console.log("erro")
  }
)
}
}
