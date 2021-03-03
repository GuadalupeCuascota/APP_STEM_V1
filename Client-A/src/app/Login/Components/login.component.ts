import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Usuario } from '../../Administrador/Models/usuario';
import {Router} from '@angular/router'
import{AlertsService} from '../../Services/alerts/alerts.service';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper=new JwtHelperService
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    nombre: '',
    apellido: '',
    nivel_academico: '',
    carrera: '',
    unidad_educativa: '',
    correo_electronico: '',
    contrasenia: '',
    id_rol: 0,
  };
  resp: any = {};
 
  errorstatus:boolean=false;
  errorMsj:any={};
  msj:any="";
  // usuario:String= '';
  // contrasenia:String='';
  constructor(
    private loginServices: LoginService,
    private router: Router,
    
    ) {}
  

  login() {
    console.log(this.user);
    this.loginServices.login(this.user).subscribe(
      (res) => {
        console.log(res);
        this.resp=res
        localStorage.setItem('token',this.resp.Token)

      console.log("el token:",this.resp.Token)
      const id_rol=this.resp.payload.id_rol;
      
      
      localStorage.setItem("payload",id_rol)
        if(id_rol==1){
          console.log("verdadero")
        this.router.navigate(['/admin']);
        }else{
          if(id_rol==2){
            this.router.navigate(['/editor']);
          }
         
        }
        
     

      },
      (err)=> {
        console.log("el error",err)
         this.errorstatus=true;
        this.errorMsj=err.error;

        this.msj=this.errorMsj.text
      
      }
      
    );
  }
  logOut(){
    this.loginServices.logOut();
  }
  ngOnInit(): void {}
}
