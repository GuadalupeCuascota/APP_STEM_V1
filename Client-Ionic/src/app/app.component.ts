import { Component } from '@angular/core';
import {AutenticacionService} from './Services/autenticacion.service'
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  datos: any = {};

  constructor() {}
 

  ngOnInit(): void {
   
    
  }

}
