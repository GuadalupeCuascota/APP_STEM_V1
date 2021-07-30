import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Publicacion } from 'src/app/Models/publicacion';

import {RegistroPublicacionService} from '../../Services/registro-publicacion.service'
@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
})
export class DetalleNoticiaPage implements OnInit {

  constructor(private regitroPublicacion: RegistroPublicacionService,
    private actRoute: ActivatedRoute) { }
  id='';
  API_URI=''
  descripcion=''
  noticia:Publicacion;
  enlace='';
  tipo_archivo='';
    
  ngOnInit() {
    // this.regitroPublicacion.getPublicacion()
   const params=this.actRoute.snapshot.params;
   console.log("el id es",params)
   this.regitroPublicacion.getPublicacion(params.id).subscribe(res=>
    {
      this.noticia=res;
      this.API_URI='http://192.168.100.45:3000/'+this.noticia.ruta_archivo;
      this.descripcion=this.noticia.descripcion;
      this.enlace=this.noticia.enlace;
      this.tipo_archivo=this.noticia.tipo_archivo

      console.log(this.noticia)
    });
  }
 
}
