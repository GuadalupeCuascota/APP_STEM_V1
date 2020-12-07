import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {RegistroUsuarioService}from '../../Services/registro-usuario.service'
@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
usuarios: any =[];
usuario: any= {
  cedula: '',
  nombre:'',
  apellido:'',
  nivel_academico:'',
  carrera:'',
  unidad_educativa: '',
 contrasenia: '',
 id_rol : '',

};
  constructor(private registroUsuarioService: RegistroUsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }
  getUsuarios(){
    this.registroUsuarioService.getUsuarios().subscribe(
      res=>{
        console.log(res),
        this.usuarios=res;
      },
    /*  res=> console.log(res), */
      err=> console.error(err) 
    );
  }
  getRol(id: String) {
    console.log(id);
    if (id) {
      this.registroUsuarioService.getUsuario(id).subscribe(
        res => {
          console.log(res);
          this.usuario= res;    
        },
        err => console.error(err)
      );
    }
    
  }
  saveUsuario() {
   
    this.registroUsuarioService.saveUsuario(this.usuario).subscribe(
      (res) => {
        console.log(this.usuario.tipo_rol)
        console.log(res);
        //this.getUsuarios();
        //  window.location.reload();
        //this.router.navigate(['usuarios']);
        this.getUsuarios();
      },
      (err) => console.error(err)
    );
  }
  deleteUsuario(cedula: string) {
    this.registroUsuarioService.deleteUsuario(cedula).subscribe(
      (res) => {
        console.log(res);
        this.getUsuarios();
        //this.toastr.success('Successfull Operation', 'Rol eliminado');
      },
      (err) => console.log(err)
    );
  }

}
