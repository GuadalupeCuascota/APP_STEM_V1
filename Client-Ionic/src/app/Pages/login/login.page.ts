import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../Services/autenticacion.service';
import { Usuario } from '../../Models/usuario';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { MensajesService } from 'src/app/Services/mensajes.service';

import {StorageService}from '../../Services/storage.service'
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/Services/loading.service';
import { MenuController } from '@ionic/angular';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordIcon = 'eye-off';
  formLogin: FormGroup;
  resp: any = {};
  errorstatus: boolean = true;

  constructor(
    private authServices: AutenticacionService,
    private formBuilder:FormBuilder,
    private mensajeServices: MensajesService,
    
    private storage:StorageService,
    private router: Router,
    private loadinServices: LoadingService,
    private menuCtrl: MenuController
   
  ) {}
  usuario: Usuario;
  
  async ngOnInit() {
    
  
    this.formLogin=this.formBuilder.group({
      correo_electronico: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required),
    })

    this.usuario = new Usuario();
    
  }
  
  toggleShow(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordIcon == 'eye-off') {
      this.passwordIcon = 'eye';
    } else {
      this.passwordIcon = 'eye-off';
    }
  }
  
 async login() {
    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();
    this.usuario.correo_electronico = this.formLogin.controls['correo_electronico'].value;
    this.usuario.contrasenia = this.formLogin.controls['contrasenia'].value;

    this.authServices.login(this.usuario).subscribe(
      (res) => {
        if (res) {
          this.resp = res;
          localStorage.setItem('Token',this.resp.Token)
          localStorage.setItem('payload',JSON.stringify(this.resp.payload))
         
          const id_rol = this.resp.payload.id_rol;
          const nivel_academico = this.resp.payload.nivel_academico;
          if (id_rol == 3 && nivel_academico=="secundaria"){
            console.log("estudiante secundaria")
            this.router.navigate(['/menu-opciones-se/home-secundaria']);
           
         
           
          }
            if (id_rol == 3 && nivel_academico=="superior"){
              
              this.router.navigate(['/menu-opciones/home-superior']);
          }
          
  
        }

        
      },
      (err) => {
        
        this.mensajeServices.presentAlert('Error', err.error.text)
      }
    );
  }
  
}
