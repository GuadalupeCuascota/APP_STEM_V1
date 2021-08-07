import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Publicacion } from 'src/app/Models/publicacion';
@Component({
  selector: 'app-publicar-contenido',
  templateUrl: './publicar-contenido.page.html',
  styleUrls: ['./publicar-contenido.page.scss'],
})
export class PublicarContenidoPage implements OnInit {
  formGroup: FormGroup;
  publicacion:Publicacion
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
  
    });
  }
  savePublicacion() {
    this.publicacion.titulo = this.formGroup.controls['titulo'].value;
    this.publicacion.descripcion = this.formGroup.controls['descripcion'].value;
    console.log("la publicacion",this.publicacion);
  }

}
