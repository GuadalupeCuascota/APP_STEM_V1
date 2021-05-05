import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { RegistroUsuarioService } from '../../../Service/registro-usuario.service';
import { RegistroRolService } from '../../../Service/registro-rol.service';
import { Rol } from '../../../Models/rol';
//importat modulo del modal para la edicion
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../../Models/usuario';
import{AlertsService} from '../../../Service/alerts/alerts.service';

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
 
   
    nombre: '',
    apellido: '',
    nivel_academico: '',
    carrera: '',
    unidad_educativa: '',
    correo_electronico: '',
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
  getUsuario(id_usuario: String) {
    console.log("este es el id"+id_usuario);
    if (id_usuario) {
      this.registroUsuarioService.getUsuario(id_usuario).subscribe(
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
      (err) => {
        console.error(err)
      this.alerts.showError('Error Operation', 'No se puede guardar')
      }
    );
  }
  deleteUsuario(id_usuario: string) {
    if(confirm('Esta seguro que desea eliminar esto?')){
    this.registroUsuarioService.deleteUsuario(id_usuario).subscribe(
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
      .updateUsuario(this.usuario1.id_usuario, this.usuario1)
      .subscribe(
        (res) => {
          this.alerts.showSuccess('Successfull Operation', 'Usuario actualizado');
          this.getUsuarios();
          console.log(res);
        },
        (err) => console.log(err)
      );
  }
}
