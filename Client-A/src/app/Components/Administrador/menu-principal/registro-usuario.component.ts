import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {LoginService} from '../../../Service/login.service'


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  datos: any = {};
  collapsed = true;
  constructor( private router: Router,
    private loginServices: LoginService
 ) { }
  logOut(){
    this.loginServices.logOut();
  }
  ngOnInit(): void {
    this.datos=JSON.parse(localStorage.getItem('payload'));
    console.log("hola admin",this.datos)
  }
 
}
