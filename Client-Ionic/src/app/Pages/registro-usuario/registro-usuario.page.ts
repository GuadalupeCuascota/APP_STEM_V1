import { Component, OnInit, ContentChild } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { LoadingService } from 'src/app/Services/loading.service';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario
  formUsuario: FormGroup;
  formnivel: FormGroup;
  estado: boolean;
  showPassword = false;
  passwordIcon = 'eye';


  constructor(private usuarioService: UsuarioService,
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private mensajeServices: MensajesService,
    private loadinServices: LoadingService
  ) { }

  ngOnInit() {

    this.formUsuario = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      nivel_academico: new FormControl('', Validators.required),

      correo_electronico: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      contrasenia: new FormControl('', Validators.required),
      unidad_educativa: new FormControl(),
      carrera: new FormControl(),

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
  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarios = res;
      console.log(this.usuarios)
    },
      err => console.log(err));
  }
  public optionsFn(event) { //here item is an object 
    console.log(event.target.value);
    if (event.target.value == "secundaria") {
      this.estado = true

    }
    else {
      this.estado = false
    }


  }

  async saveUsuarios() {

    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();

    this.usuario.nombre = this.formUsuario.controls['nombre'].value;
    this.usuario.apellido = this.formUsuario.controls['apellido'].value;
    this.usuario.correo_electronico = this.formUsuario.controls['correo_electronico'].value;
    this.usuario.contrasenia = this.formUsuario.controls['contrasenia'].value;
    this.usuario.nivel_academico = this.formUsuario.controls['nivel_academico'].value;
    this.usuario.carrera = this.formUsuario.controls['carrera'].value;
    this.usuario.unidad_educativa = this.formUsuario.controls['unidad_educativa'].value;
    this.usuarioService.saveUsuario(this.usuario).subscribe(res => {
      loading.dismiss();
      if (res) {
        this.mensajeServices.presentToast("Usuario registrado");
        console.log("usuario guardado")
        this.navController.back();
      }

    },
      () => {
        loading.dismiss();
        this.mensajeServices.presentAlert('Error', 'Hubo un problema al guardar')
      }
    )
  }

}
