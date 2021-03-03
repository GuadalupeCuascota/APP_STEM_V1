import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  datos: any = {};
  constructor( private router: Router,
 ) { }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
  ngOnInit(): void {
    
    
  }
 
}
