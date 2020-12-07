import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { RegistroRolService } from '../../Services/registro-rol.service';
import { ToastrService } from 'ngx-toastr';

//importar las rutas
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css'],
})
export class RolesListComponent implements OnInit {
  roles: any = [];

  rol: any= {
    id_rol: 0,
    tipo_rol: '',
  };
  edit: boolean=false;
  constructor( 
    private registroRolService: RegistroRolService,
    private router: Router,
    private toastr: ToastrService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRoles();
   
  }

  getRoles() {
    this.registroRolService.getRoles().subscribe(
      (res) => {
        console.log(res);
        this.roles = res;
        
      },
      (err) => console.error(err)
    );
  }

  saveRol() {
    delete this.rol.id_rol;
    this.registroRolService.saveRol(this.rol).subscribe(
      (res) => {
        console.log(res);
        this.getRoles();
        //  window.location.reload();
        //this.router.navigate(['usuarios']);
      },
      (err) => console.error(err)
    );
  }
  deleteRol(id: string) {
    this.registroRolService.deleteURol(id).subscribe(
      (res) => {
        console.log(res);
        this.getRoles();
        //this.toastr.success('Successfull Operation', 'Rol eliminado');
      },
      (err) => console.log(err)
    );
  }
  getRol(id: String) {
    console.log(id);
    if (id) {
      this.registroRolService.getRol(id).subscribe(
        res => {
          console.log(res);
          this.rol= res;   
          this.edit=true 
          
        },
        err => console.error(err)
      );
    }
    
  }
  updateRol(){
    console.log(this.rol)
    this.registroRolService.updateRol(this.rol.id_rol,this.rol).subscribe(
      res=>{
        console.log(res);
        this.getRoles();
        this.edit=false;
        //window.location.reload();

      },
      err=>console.log(err)  
    );


  }

}
