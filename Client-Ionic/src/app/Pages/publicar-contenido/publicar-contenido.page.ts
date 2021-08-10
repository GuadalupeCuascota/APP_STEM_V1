import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Publicacion } from 'src/app/Models/publicacion';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-publicar-contenido',
  templateUrl: './publicar-contenido.page.html',
  styleUrls: ['./publicar-contenido.page.scss'],
})
export class PublicarContenidoPage implements OnInit {
  fotos:any[]=[]
  imgRes: any;
  options: any;
  formGroup: FormGroup;
  publicacion:Publicacion
  constructor(private formBuilder: FormBuilder,public imgPicker: ImagePicker) { }

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


  imagePicker() {
  //   let arr=[];
  //     arr[0]='http://lorempixel.com/350/230'
  //     arr[1]='http://lorempixel.com/400/200'
  //     arr[2]='http://lorempixel.com/500/300'
    
    
  // this.fotos=arr

    let options: ImagePickerOptions={
      maximumImagesCount:2,
    
    }
 
    this.imgPicker.getPictures(options).then((res) => {
      console.log("pasa")
      this.fotos=res;
      
      for (var i=0; i< res.length;i++) {
        console.log('Imagee URI:' +res[i]);
        // this.imgRes.push('data:image/jpeg;base64,' + aux);
        // console.log("pasa aqui",this.imgRes)

      }
     
    }, (err) => {
      console.log("error"+err)
    
    });

    // this.options = {
    //   width: 200,
    //   quality: 30,
    //   outputType: 1
    // };
    
    // this.imgRes = [];
  }


}
