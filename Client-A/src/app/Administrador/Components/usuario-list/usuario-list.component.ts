import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { RegistroUsuarioService } from '../../Services/registro-usuario.service';
import { RegistroRolService } from '../../Services/registro-rol.service';
import { Rol } from '../../Models/rol';
//importat modulo del modal para la edicion
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../Models/usuario';
import{AlertsService} from '../../../Services/alerts/alerts.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent implements OnInit {
  closeResult = '';
  roles: any = [];
  usuarios: any = [];
  usuario1: any = {};
  usuario: Usuario = {
    cedula: '',
    nombre: '',
    apellido: '',
    nivel_academico: '',
    carrera: '',
    unidad_educativa: '',
    contrasenia: '',
    id_rol: 0,
  };

  
  constructor(
    private registroUsuarioService: RegistroUsuarioService,
    private registroRolService: RegistroRolService,
    private alerts: AlertsService,
    private modalService: NgbModal
  ) {}
  p: number = 1;
  ngOnInit(): void {
    this.getUsuarios();
    this.ObtenerRoles();
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
          this.getUsuarios();
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
    this.getUsuarios();
  }
  
  ////////////////////////////////////////////////////

  getUsuarios() {
    this.registroUsuarioService.getUsuarios().subscribe(
      (res) => {
        console.log(res);
        this.usuarios = res;
      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  
  }
  getUsuario(cedula: String) {
    console.log(cedula);
    if (cedula) {
      this.registroUsuarioService.getUsuario(cedula).subscribe(
        (res) => {
          console.log(res);

          this.usuario1 = res;
          console.log('este es:' + this.usuario1.tipo_rol);
        },
        (err) => console.error(err)
      );
    }
  }
  ObtenerRoles() {
    var rol = [];
    this.registroRolService.getRoles().subscribe(
      (res: any) => {
        for (let rol1 of res) {
          if (rol1.id_rol == 1 || rol1.id_rol == 2) {
            rol.push(rol1);
            console.log(rol);
          }
        }
        this.roles = rol;
      },
      (err) => console.error(err)
    );
  }

  saveUsuario() {
    console.log(this.usuario);
    this.registroUsuarioService.saveUsuario(this.usuario).subscribe(
      (res) => {
        
       this.getUsuarios();
        console.log(res);
        this.alerts.showSuccess('Successfull Operation', 'Usuario guardado')
      },
      (err) => console.error(err)
    );
  }
  deleteUsuario(cedula: string) {
    if(confirm('Esta seguro que desea eliminar esto?')){
    this.registroUsuarioService.deleteUsuario(cedula).subscribe(
      (res) => {
        console.log(res);
        this.getUsuarios();
        this.alerts.showSuccess('Successfull Operation', 'Usuario eliminado');
        //this.toastr.success('Successfull Operation', 'Rol eliminado');
      },
    
      (err) => console.log(err)
    );
    }
  }
  updateUsuario() {
    console.log(this.usuario1);
    this.registroUsuarioService
      .updateUsuario(this.usuario1.cedula, this.usuario1)
      .subscribe(
        (res) => {
          this.getUsuarios();
          console.log(res);
        },
        (err) => console.log(err)
      );
  }
}
