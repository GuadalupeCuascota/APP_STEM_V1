import { Component, OnInit } from '@angular/core';
import { RegistroArchivoService } from "../../../Editor/Services/registro-archivo.service";
import {Publicacion} from '../../Models/publicacion'
import{AlertsService} from '../../../Services/alerts/alerts.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfiles-mujeres',
  templateUrl: './perfiles-mujeres.component.html',
  styleUrls: ['./perfiles-mujeres.component.css']
})
export class PerfilesMujeresComponent implements OnInit {
  perfiles:  Publicacion= {
    titulo:'',
    descripcion:'',
    enlace:'',
    profesion:'',
    estado_profesion: '',
    ruta_archivo:'',
    id_tipo_publicacion: '1',
    id_estado_publicacion :'1',
    id_usuario : '1',
  };
  closeResult = '';
  //file: Array<File>
  archivosSeleccionado :File
  fotoSeleccionada:string| ArrayBuffer 
  constructor(private registroArchivo: RegistroArchivoService, private alerts : AlertsService,
  private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  ///////////////////////METODOS DEL MODAL///////////////////////////
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  close(content) {
    this.modalService.dismissAll(content);
   
  }
  ///////////////////////////////////////////////////////
  onFileSelect  (event){
   
    if(event.target.files.length>0){

      this.archivosSeleccionado= <File> event.target.files[0];
      console.log("Archivo cargado", this.archivosSeleccionado)

      const reader= new FileReader(); //Crear un objeto de tipo FileReader  para leer la imagen
      reader.readAsDataURL(this.archivosSeleccionado); //leemos la imagen pasado por parametro
      reader.onload =e=>this.fotoSeleccionada=reader.result //Comprobamos la carga del archivo y enviamos el resultado
      
     
    
     
  

    }else {
      this.alerts.showError('Error Operation', 'Seleccione imagen')
    }
   
   
  }
 
  saveArchivo(){
   console.log(this.perfiles)
   
    try{
      const fd =new FormData(); //objeto que almacena datos de un formulario
      // for( let i=0; i<this.archivosSeleccionado.length; i++){
        fd.append('ruta_archivo',this.archivosSeleccionado)
        fd.append('titulo',this.perfiles.titulo)
        fd.append('descripcion',this.perfiles.descripcion)
        fd.append('id_usuario',this.perfiles.id_usuario)
        fd.append('id_tipo_publicacion',this.perfiles.id_tipo_publicacion)
        fd.append('id_estado_publicacion',this.perfiles.id_estado_publicacion)
      
      this.registroArchivo.saveArchivo(fd).subscribe(
        (res)=>{
          this.alerts.showSuccess('Successfull Operation', 'Archivo guardado')
        },
    
         (err)=>
           console.log(err)
        
      );
     }catch{
       console.log("No se ha seleccionado el archivo")
     }
  }
}
