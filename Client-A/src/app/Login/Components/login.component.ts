import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={
    usuario:'',
    contrasenia:'',
  }
  // usuario:String= '';
  // contrasenia:String='';
  constructor() { }
  login() {
    console.log(this.user);
    
  }
  ngOnInit(): void {
  
  }
 
}
