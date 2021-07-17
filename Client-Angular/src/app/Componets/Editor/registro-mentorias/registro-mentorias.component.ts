import { Component, Injectable, OnInit } from '@angular/core';
import { RegistroMentoriaService } from '../../../Services/registro-mentoria.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../Services/alerts/alerts.service';
import { Mentoria } from 'src/app/Models/mentoria';

import * as moment from 'moment/moment';
  

@Component({
  selector: 'app-registro-mentorias',
  templateUrl: './registro-mentorias.component.html',
  styleUrls: ['./registro-mentorias.component.css'],
  
})

export class RegistroMentoriasComponent implements OnInit {

  datos: any = {};
  closeResult = '';
  localTime = moment().format('YYYY-MM-DD')
  mentorias: any = [];
  mentoria1: any = {
    
  };
  
  mentoria: Mentoria = {
    fecha: this.localTime,
    hora_inicio: '',
    hora_fin: '',
    tipo_mentoria: '',
    id_estado_mentoria: 1,
    id_usuario: 0,
  };
  textoBuscar = '';
  p: number = 0;
  constructor(
    private registroMentoriaService: RegistroMentoriaService,
    private alerts: AlertsService,
    private modalService: NgbModal,
  
   
   
  ) {}
  
  ngOnInit(): void {
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.getMentorias();
    this.mentoria.id_usuario=this.datos.id_usuario
   
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
          // this.getMentorias();
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
    // this.getMentorias();
  }

  ////////////////////////////////////////////////////

  getMentorias() {
   
    console.log('obtner mentorias');
    var UsuMentoria = [];
    this.registroMentoriaService.getMentorias().subscribe(
      (res: any) => {
        console.log(res);
        for (let usu1 of res) {
          if (usu1.id_usuario == this.datos.id_usuario) {
            usu1.fecha = this.localTime ;
            UsuMentoria.push(usu1);
          }
        }
        this.mentorias = UsuMentoria;
        console.log(this.mentorias);
      },

      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  }
  getMentoria(id_mentoria: String) {
  
    console.log('este es el id' + id_mentoria);
    if (id_mentoria) {
      this.registroMentoriaService.getMentoria(id_mentoria).subscribe(
        (res) => {
          console.log(res);
         
          this.mentoria1 = res;
          this.mentoria1.fecha=this.localTime
          
        },
        (err) => console.error(err)
      );
    }
  }

  saveMentoria() {
   console.log('el usuario2',this.mentoria);
  if(this.mentoria.hora_fin>this.mentoria.hora_inicio){
    this.registroMentoriaService.saveMentoria(this.mentoria).subscribe(
      (res) => {
        this.getMentorias();
        
        console.log(res);
        this.alerts.showSuccess('Successfull Operation', 'Mentoria registrada')
      },
      (err) => {
        console.error(err)
      this.alerts.showError('Error Operation', 'No se puede guardar')
      }
    );
  }else{
    this.alerts.showError('Error Operation', 'La hora fin debe ser mayor a la hora de inicio')
  }
   
   
  }
  deleteMentoria(id_mentoria: string) {
    if (confirm('Esta seguro que desea eliminar esto?')) {
      this.registroMentoriaService.deleteMentoria(id_mentoria).subscribe(
        (res) => {
          console.log(res);
           this.getMentorias();
          this.alerts.showSuccess('Successfull Operation', 'Registro mentoria eliminado');
          //this.toastr.success('Successfull Operation', 'Rol eliminado');
        },

        (err) => console.log(err)
      );
    }
  }
  updateMentoria() {
    console.log(this.mentoria1);
    this.registroMentoriaService.
      updateMentoria(this.mentoria1.id_registro_mentoria,this.mentoria1).subscribe(
        (res) => {
          this.alerts.showSuccess(
            'Successfull Operation',
            'Registro mentoria actualizado'
          );
         this.getMentorias();
          console.log(res);
        },
        (err) => console.log(err)
      );
  }
}
