import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../Services/autenticacion.service';
import { Usuario } from '../../Models/usuario';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { MensajesService } from 'src/app/Services/mensajes.service';

import {StorageService}from '../../Services/storage.service'
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/Services/loading.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordIcon = 'eye';
  formLogin: FormGroup;
  resp: any = {};
  constructor(
    private authServices: AutenticacionService,
    private formBuilder:FormBuilder,
    private mensajeServices: MensajesService,
    
    private storage:StorageService,
    private router: Router,
    private loadinServices: LoadingService
   
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
    if (this.passwordIcon == 'eye') {
      this.passwordIcon = 'eye-off';
    } else {
      this.passwordIcon = 'eye';
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
          this.storage.set('Token',this.resp.Token);
          this.storage.set('payload',JSON.stringify(this.resp.payload));
          
          const id_rol = this.resp.payload.id_rol;
          const nivel_academico = this.resp.payload.nivel_academico;
          if (id_rol == 3 && nivel_academico=="secundaria"){
            this.router.navigate(['/menu-principal']);
          }else{
            if (id_rol == 3 && nivel_academico=="superior"){
              this.router.navigate(['/menu-principal-u']);
          }

        }
        }
      },
      (err) => {
        this.mensajeServices.presentAlert('Error', err.error.text)
      }
    );
  }
}
