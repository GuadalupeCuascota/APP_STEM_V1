import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/Models/publicacion';
import {RegistroPublicacionService} from '../../Services/registro-publicacion.service'

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  noticias: Publicacion[] = [];
 
  constructor(private regitroPublicacion: RegistroPublicacionService) { }

  ngOnInit() {
    this.getNoticias();
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
}
