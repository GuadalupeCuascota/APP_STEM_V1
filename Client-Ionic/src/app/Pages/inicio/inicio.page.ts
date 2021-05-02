import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../Services/storage.service'
import {AutenticacionService} from '../../Services/autenticacion.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private storage:StorageService, private router: Router
    ,private autenticacion:AutenticacionService) { }

  ngOnInit() {
  }
  logout(){
    this.autenticacion.logOut();

  }
}
