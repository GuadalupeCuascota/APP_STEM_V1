import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:String= '';
  contrasenia:String='';
  constructor() { }
  login() {
    console.log(this.usuario);
    console.log(this.contrasenia);
  }
  ngOnInit(): void {

  }

}
