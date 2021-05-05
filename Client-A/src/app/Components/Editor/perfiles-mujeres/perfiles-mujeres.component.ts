import { Component, OnInit } from '@angular/core';
import { RegistroArchivoService } from "../../../Service/registro-archivo.service";
import {Publicacion} from '../../../Models/publicacion'
import{AlertsService} from '../../../Services/alerts/alerts.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-perfiles-mujeres',
  templateUrl: './perfiles-mujeres.component.html',
  styleUrls: ['./perfiles-mujeres.component.css']
})
export class PerfilesMujeresComponent implements OnInit {
  id='';
  datos: any = {};
  perfiles: any|Publicacion=[];
  
  
  perfil: any|Publicacion= {
    id_publicacion:0,
    titulo :'',
    fecha_publicacion: new Date(),
    descripcion:'',
    enlace:'',
    profesion:'',
    estado_profesion: '',
    ruta_archivo:'',
    id_tipo_publicacion: '',
    id_estado_publicacion :'1',
    id_usuario : '',
  };
  API_URI:string;
  edit: boolean=false;
  closeResult = '';
  //file: Array<File>
  archivosSeleccionado :File
  leerArchivo:string| ArrayBuffer 
  constructor(private registroArchivo: RegistroArchivoService, private alerts : AlertsService,
  private modalService: NgbModal,private router:ActivatedRoute ) { }
  p: number = 1;
  ngOnInit(): void {
    
    this.id=this.router.snapshot.paramMap.get('id');
    console.log("el id de la ruta",this.id)

    this.datos=JSON.parse(localStorage.getItem('payload'));
    this.getpublicaciones();
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

  clear() {
    console.log("clear clicked")
    this.perfil.descripcion=null
    this.perfil.estado_profesion=null
    this.perfil.profesion=null
    this.leerArchivo=null
    this.API_URI=null
    

  }
  onFileSelect  (event){
   console.log(event)
    if(event.target.files.length>0){

      this.archivosSeleccionado= <File> event.target.files[0];
      console.log("Archivo cargado", this.archivosSeleccionado)

      const reader= new FileReader(); //Crear un objeto de tipo FileReader  para leer la imagen
      reader.readAsDataURL(this.archivosSeleccionado); //leemos la imagen pasado por parametro
      reader.onload =e=>this.leerArchivo=reader.result //Comprobamos la carga del archivo y enviamos el resultado
      
    }else {
      console.log("seleccione imagen")
      this.alerts.showError('Error Operation', 'Seleccione imagen')
    }
   
   
  }
 
  saveArchivo(){
   console.log(this.perfil)
   
    try{
      const fd =new FormData(); //objeto que almacena datos de un formulario
      // for( let i=0; i<this.archivosSeleccionado.length; i++){
        fd.append('ruta_archivo',this.archivosSeleccionado)
        fd.append('profesion',this.perfil.profesion)
        fd.append('estado_profesion',this.perfil.estado_profesion)
        fd.append('descripcion',this.perfil.descripcion)
        fd.append('id_usuario',this.datos.id_usuario)
        fd.append('id_tipo_publicacion',this.id)
        fd.append('id_estado_publicacion',this.perfil.id_estado_publicacion)
      
      this.registroArchivo.saveArchivo(fd).subscribe(
        (res)=>{
          console.log(res)
          this.getpublicaciones();
          this.alerts.showSuccess('Successfull Operation', 'Archivo guardado')
        },
    
         (err)=>
           console.log(err)
        
      );
     }catch{
       console.log("No se ha seleccionado el archivo")
     }
  }

  getpublicaciones() {
    var per = [];
    
    this.registroArchivo.getArchivos().subscribe(
      (res:any) => {
        for (let per1 of res) {
          if (per1.id_tipo_publicacion == 1 ) {
            per.push(per1);
            console.log(per);
          }
        }
      
        

        this.perfiles = per;
        
      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  
  }
  getpublicacion(id: String) {
    
    console.log(id);
    if (id) {
      this.registroArchivo.getArchivo(id).subscribe(
        res => {
          console.log(res);
          this.perfil=res;
          this.API_URI='http://localhost:3000/'+this.perfil.ruta_archivo;
          this.edit=true 
         
          
        },
        err => console.error(err)
      );
    }
    
  }
  updatepublicacion() {
    console.log("hola",this.perfil.ruta_archivo)
    try {
      const fda =new FormData(); //objeto que almacena datos de un formulario
      // for( let i=0; i<this.archivosSeleccionado.length; i++){
        fda.append('ruta_archivo',this.archivosSeleccionado)
        fda.append('profesion',this.perfil.profesion)
        fda.append('estado_profesion',this.perfil.estado_profesion)
        fda.append('descripcion',this.perfil.descripcion)
       
      // delete this.perfil.fecha_publicacion;

    
    this.registroArchivo.updateArchivo(this.perfil.id_publicacion, fda)
      .subscribe(
        (res) => {
          this.alerts.showSuccess('Successfull Operation', 'publicación actualizado');
          this.getpublicaciones();
          console.log(res);
        },
        (err) => console.log(err)
      );
      
    } catch (error) {
      
    }
    
  }

  deletePublicacion(id: String) {
console.log(id)

    if(confirm('Esta seguro que desea eliminar esto?')){
    this.registroArchivo.deleteArchivo(id).subscribe(
   
      (res) => {
        console.log(res);
        this.getpublicaciones();
        this.alerts.showSuccess('Successfull Operation', 'Rol eliminado');
      },
      (err) => console.log(err)
    );
    }
  }
}
