import { Component, OnInit } from '@angular/core';
import { RegistroArchivoService } from "../../../Editor/Services/registro-archivo.service";

import{AlertsService} from '../../../Services/alerts/alerts.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfiles-mujeres',
  templateUrl: './perfiles-mujeres.component.html',
  styleUrls: ['./perfiles-mujeres.component.css']
})
export class PerfilesMujeresComponent implements OnInit {
  closeResult = '';
  archivosSeleccionado :Array <File>
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
  onFileSelect  (e){
    if(e.target.files.length>0){
      this.archivosSeleccionado=e.target.files;
      console.log("Archivo cargado", this.archivosSeleccionado)

    }
   
   
  }
 
  saveArchivo(){
    try{
      const fd =new FormData(); //objeto que almacena datos de un formulario
      for( let i=0; i<this.archivosSeleccionado.length; i++){
        fd.append('file',this.archivosSeleccionado[i])
    
      }
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
