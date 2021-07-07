import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../Services/Login/login.service'

import {Router} from '@angular/router'
@Component({
  selector: 'app-menu-principal-editor',
  templateUrl: './menu-principal-editor.component.html',
  styleUrls: ['./menu-principal-editor.component.css']
})
export class MenuPrincipalEditorComponent implements OnInit {
  datos: any = {};
  collapsed = true;
  constructor(private loginServices: LoginService) { }
 
  logOut(){
    this.loginServices.logOut();
  }
  ngOnInit(): void {
    this.datos=JSON.parse(localStorage.getItem('payload'));
   
    var menu_btn = document.querySelector("#menu-btn");
  var sidebar = document.querySelector("#sidebar");
  var container = document.querySelector(".my-container");
  menu_btn.addEventListener("click", () => {
    sidebar.classList.toggle("active-nav");
    container.classList.toggle("active-cont");
  });
  }
  
  

}
