import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroMentorias } from 'src/app/Models/registro-mentorias';
import { RegistroMentoriasService } from 'src/app/Services/registro-mentorias.service';
import {UsuarioService  } from '../../../Services/usuario.service'
@Component({
  selector: 'app-registro-tutorias',
  templateUrl: './registro-tutorias.page.html',
  styleUrls: ['./registro-tutorias.page.scss'],
})
export class RegistroTutoriasPage implements OnInit {
  registroMentorias:RegistroMentorias []=[];
  usuariosM:any []= [];
  datos: any = {};
  
  constructor(private regitroMentoriasService: RegistroMentoriasService,private router: Router,private usuarioServices:UsuarioService) { }

  ngOnInit() {
    
    
    this.getUsuarios();
    this.doRefresh();
    this.datos=JSON.parse(localStorage.getItem('payload'));
  }

  doRefresh($event?:any){ //envia un evento opcional de tipo any
    this.getRegistroMentorias();
    if($event){
      $event.target.complete();
    }

  }
  
  loadData(event) {
    console.log(event,"el evento")
   setTimeout(() => {
     console.log('Done');
     event.target.complete();
 
   
     if (this.registroMentorias.length ==9) {
       event.target.disabled = true;
       console.log("es igual")
     }
   }, 500);
 }
 
 getRegistroMentorias(){
   this.regitroMentoriasService.getRegistroMentorias().subscribe(res=>{
   console.log("las mentorias",res)
   this.registroMentorias=res;
   console.log("mentorias",this.registroMentorias)
  },
  err=>{
console.log(err)
  })
}
detalle(id: number){
  console.log("la publicacion",id)
 this.router.navigate(['/detalle-mentoria/',id]);
}
getUsuarios(){
  console.log("MENTORES")
  var usuAE = [];
  this.usuarioServices.getUsuarios().subscribe(
    
    (res:any) => {
      console.log(res)
      for (let usu of res) {
        if (usu.tipo_rol=="Mentor"){
          console.log("datos",this.datos)
         
          usuAE.push(usu);
          console.log("el usuario",usuAE)
          
      }
    }
      console.log(res);
       this.usuariosM = usuAE  ;
      
    },
    /*  res=> console.log(res), */
    (err) => console.error(err)
  );
}
}