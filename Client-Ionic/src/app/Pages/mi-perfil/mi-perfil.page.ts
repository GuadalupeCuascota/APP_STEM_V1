import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/Models/usuario';
import { LoadingService } from 'src/app/Services/loading.service';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {
  usuario:Usuario
  datos: any = {};
  formGroup: FormGroup;
  showPassword = false;
  passwordIcon = 'eye';
 
  constructor(private usuarioService: UsuarioService,
    private actRoute: ActivatedRoute,
    private loadinServices: LoadingService,
    private mensajeServices: MensajesService,
    private formBuilder: FormBuilder,
    private navController:NavController,
    ) { }
  
  async ngOnInit() {
    this.datos=JSON.parse(localStorage.getItem('payload'));


    this.formGroup = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      // nivel_academico: new FormControl('', Validators.required),
       correo_electronico: new FormControl('', Validators.required),
       contrasenia: new FormControl('', Validators.required),
      // carrera: new FormControl('',Validators.required),
    });
    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();
    const params=this.actRoute.snapshot.params
    if(params && params.id){
      this.usuarioService.getUsuario(params.id).subscribe(res => {
      this.usuario=res;
      console.log("el usu",this.usuario)
      this.formGroup.controls['nombre'].setValue(this.usuario.nombre);
      this.formGroup.controls['apellido'].setValue(this.usuario.apellido);
      this.formGroup.controls['correo_electronico'].setValue(this.usuario.correo_electronico);
      this.formGroup.controls['contrasenia'].setValue(this.usuario.contrasenia);
      
        },
        () => {
          loading.dismiss();
          this.mensajeServices.presentAlert('Error', 'Hubo un problema al actualizar su información')
        }
        );
    }else{
     this.usuario=new Usuario();
    }

  }
  toggleShow(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordIcon == 'eye') {
      this.passwordIcon = 'eye-off';
    } else {
      this.passwordIcon = 'eye';
    }
  }
  
   async updateUsuarios() {

    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();

    this.usuario.nombre = this.formGroup.controls['nombre'].value;
    this.usuario.apellido = this.formGroup.controls['apellido'].value;
    this.usuario.correo_electronico = this.formGroup.controls['correo_electronico'].value;
    this.usuario.contrasenia = this.formGroup.controls['contrasenia'].value;
    
    this.usuarioService.updateUsuario(this.usuario.id_usuario,this.usuario).subscribe(res => {
      loading.dismiss();
      if (res) {
        this.mensajeServices.presentToast("Usuario actualizado");
        // this.navController.back();
        console.log("usuario guardado")
      }

    },
      () => {
        loading.dismiss();
        this.mensajeServices.presentAlert('Error', 'Hubo un problema al guardar')
      }
    )
  }
}
