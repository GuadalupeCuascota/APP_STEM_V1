import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-superior',
  templateUrl: './home-superior.page.html',
  styleUrls: ['./home-superior.page.scss'],
})
export class HomeSuperiorPage implements OnInit {

  datos: any = {};
  constructor() { }

  ngOnInit() {
    this.datos=JSON.parse(localStorage.getItem('payload'));
    console.log("hola estudiante secundaria",this.datos)
  }
}
