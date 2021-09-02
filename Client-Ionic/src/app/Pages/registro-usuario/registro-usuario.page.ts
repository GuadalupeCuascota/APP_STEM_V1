import { Component, OnInit, ContentChild } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { Carreras } from 'src/app/Models/carreras-fica';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { RegistroCarrerasService } from 'src/app/Services/registro-carreras.service';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { LoadingService } from 'src/app/Services/loading.service';
RegistroCarrerasService



@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  usuarios: Usuario[]=[];
  carreras: Carreras[]=[];
  usuario: Usuario
  formUsuario: FormGroup;
  formnivel: FormGroup;
  estado: boolean;
  showPassword = false;
  passwordIcon = 'eye';
  isLoaded=false;
  // carreras= ['Ingeniería en Mecatrónica', 'Ingeniería en Telecomunicaciones','Ingeniería en Software','Ingeniería Industrial','Ingeniería Textil','Ingeniería Automotriz', 'Ingeniería en Electricidad'];

  constructor(private usuarioService: UsuarioService,
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private mensajeServices: MensajesService,
    private loadinServices: LoadingService,
    private  registroCarreraService: RegistroCarrerasService 
  ) { }

  ngOnInit() {
    this.getCarreras();
//Validators.email
    this.formUsuario = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      nivel_academico: new FormControl('', Validators.required),
      correo_electronico: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required),
      unidad_educativa: new FormControl(),
      carrera: new FormControl(),
 // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
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
  getCarreras() {
    var auxper = [];
    this.registroCarreraService.getCarreras().subscribe(
      (res) => {
        console.log("la ress",res)
        for (let aux of res) {
          if (aux.id_carrera !=1) {
            auxper.push(aux);
          }
        }
        this.carreras =auxper;
        this.isLoaded=true;

      },
      (err) => {
        console.log(err);
      }
    );
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
