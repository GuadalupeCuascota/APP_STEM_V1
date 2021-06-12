import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-secundaria',
  templateUrl: './home-secundaria.page.html',
  styleUrls: ['./home-secundaria.page.scss'],
})
export class HomeSecundariaPage implements OnInit {
  datos: any = {};
  constructor() { }

  ngOnInit() {
    this.datos=JSON.parse(localStorage.getItem('payload'));
    console.log("hola estudiante secundaria",this.datos)
  }

}
