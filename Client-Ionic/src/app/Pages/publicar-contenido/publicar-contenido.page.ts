import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators,} from '@angular/forms';
import { Publicacion } from 'src/app/Models/publicacion';

import { RegistroPublicacionService } from '../../Services/registro-publicacion.service';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import {ImagePicker,ImagePickerOptions} from '@ionic-native/image-picker/ngx';
///COMPLEMENTOS FILE//
import { File } from '@ionic-native/file/ngx';
import {FileTransfer,FileUploadOptions,FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-publicar-contenido',
  templateUrl: './publicar-contenido.page.html',
  styleUrls: ['./publicar-contenido.page.scss'],
})
export class PublicarContenidoPage implements OnInit {
 
  respData: any;
  imgRes: any;
 formGroup: FormGroup;
  publicacion: Publicacion;
  archivo: File;
  
  id_carrera = 'sin asignar';
  id_tipo_publicacion = '2';
  id_estado_publicacion = '2';
  datos: any = {};
  fileUrl: any = null;
  fileTransfer: FileTransferObject = this.transfer.create();
  
uploadText:any;
donwloadText:any;
url: string;
imageURI:any;

  constructor(
    private formBuilder: FormBuilder,
    public imagPicker: ImagePicker,
    public file: File,
    private transfer: FileTransfer,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private regitroPublicacion: RegistroPublicacionService,
    private photoLibrary: PhotoLibrary,
    private camera: Camera,
  
    public loadingCtrl: LoadingController,
    
  ) {
    this.uploadText="";
    this.donwloadText="";

  }

  ngOnInit() {
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.formGroup = this.formBuilder.group({
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
  }

 
  open() {
    let filter = { mime: 'image/png , video/mp4' };
    this.fileChooser.open(filter).then((uri) => {
      this.filePath.resolveNativePath(uri).then((nativepath)=>{

        this.url = nativepath;

      console.log("la url",this.url)
      this.upload();
      },(err)=>{
        alert(JSON.stringify(err))
      })

        
      
      })

      .catch((e) => console.log(e));
  }
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      console.log("umg",imageData)
      this.url = imageData;
      this.upload()
    }, (err) => {
      console.log(err);
      
    });
  }
  getFormData(){
    this.fileChooser.open().then((uri)=>{
      console.log(uri)
      this.file.resolveLocalFilesystemUrl(uri).then((nativepath)=>{
     console.log("path",nativepath);
  
  
  
  
  
  },(err)=>{
    alert(JSON.stringify(err))
  })
  this.imgRes = {};
  this.filePath.resolveNativePath(uri).then((nativepath)=>{
  this.url=nativepath
    console.log("ruta",nativepath);
    this.upload()
    
  },(err)=>{
    alert(JSON.stringify(err))
  })
  },
  (err)=>{
  alert(JSON.stringify(err))  
  }
  )
  }

  upload() {
    console.log("pasa upload")
    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: 'name.jpg',
       headers: {}
       
    }
  console.log("url new",this.url)
    this.fileTransfer.upload(this.url, 'http://192.168.100.45:3000/uploads/', options)
     .then((data) => {
      console.log("data",data);
      this.respData = JSON.parse(data.response);
      console.log("respData",this.respData);
      this.fileUrl = this.respData.fileUrl;
       // success
     }, (err) => {
       console.log(err)
     })
  }
  
  savePublicacion() {
    console.log('save');
    try {
      const fd = new FormData();
      fd.append('titulo', this.formGroup.controls['titulo'].value);
      fd.append('descripcion', this.formGroup.controls['descripcion'].value);
      fd.append('ruta_archivo', this.url);
      fd.append('id_carrera', this.id_carrera);
      fd.append('id_usuario', this.datos.id_usuario);
      fd.append('id_tipo_publicacion', this.id_tipo_publicacion);
      fd.append('id_estado_publicacion', this.id_estado_publicacion);

      this.regitroPublicacion.savePublicacion(fd).subscribe(
        (res) => {
          console.log('respuesta', res);
        },
        (err) => {
          console.log('err', err);
        }
      );
    } catch {
      console.log('error');
    }
  }
  


}
//fotoLibrary(){
  //   this.photoLibrary.requestAuthorization().then(() => {
  //     console.log("permisos")
  //     this.photoLibrary.getLibrary().subscribe({
  //       next: library => {
  //         console.log("li",library)
          
  //       },
  //       error: err => { console.log('could not get photos'); },
  //       complete: () => { console.log('done getting photos'); }
  //     });
  //   })
  //   .catch(err => console.log('permissions weren\'t granted'));
  // }
  
  /////// METODO II/////////////
  // pickerimg(){
  //   var options: ImagePickerOptions={
  //     maximumImagesCount:2,
  //     width:100,
  //     height:100

  //   }
  //   this.imagPicker.getPictures(options).then((results)=>{
  //     for (var i=0; i< results.length;i++) {
  //       let filename=results[i].substring(results[i].lastIndexOf('/')+1);
  //       let path=results[i].substring(0,results[i].lastIndexOf('/')+1);
  //       this.file.readAsDataURL(path,filename).then((base64String)=>{
  //        this.imagenes.push(base64String )
  //       })
  //     }
  //   })
  // }

