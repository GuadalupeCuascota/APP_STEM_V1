import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroMentorias } from 'src/app/Models/registro-mentorias';
import { RegistroMentoriasService } from 'src/app/Services/registro-mentorias.service';
import { UsuarioService } from '../../../Services/usuario.service';
import * as moment from 'moment';
import { AlertController, NavController } from '@ionic/angular';
import { AgendarMentoria } from 'src/app/Models/agendarMentoria';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { AgendarMentoriaService } from 'src/app/Services/agendar-mentoria.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { RegistroCarrerasService } from 'src/app/Services/registro-carreras.service';
import {
  FormBuilder,  
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SolicitudMentoria } from 'src/app/Models/solicitudMentoria';
import { SolicitudMentoriaService } from 'src/app/Services/solicitud-mentoria.service';

@Component({
  selector: 'app-registro-tutorias',
  templateUrl: './registro-tutorias.page.html',
  styleUrls: ['./registro-tutorias.page.scss'],
})
export class RegistroTutoriasPage implements OnInit {
  valueSelected: string = '1';
  registroMentorias: any[] = [];
  registroM: RegistroMentorias;
  usuariosM: any[] = [];
  materiasC: any[] = [];
  solicitudesEst: any[] = [];
  solicitudM: SolicitudMentoria;
  datos: any = {};

  localTime = moment().format();
  mensaje = '';
  agendarMentoria: AgendarMentoria = {
    id_registro_mentoria: 0,
    observacion: '',
    id_estado_agen_mentoria: 1,
    id_usuario: 0,
    fecha: '',
    nombre: '',
    apellido: '',
    hora_inicio: '',
    hora_fin: '',
  };
  id_registro_mentoria = 0;
  altert: boolean = false;
  formSolicitudM: FormGroup;
  
  constructor(
    private regitroMentoriasService: RegistroMentoriasService,
    private router: Router,
    private usuarioServices: UsuarioService,
    public alertController: AlertController,
    private mensajeServices: MensajesService,
    private regitroAgendarMentoriaService: AgendarMentoriaService,
    private loadinServices: LoadingService,
    private registroCarrera: RegistroCarrerasService,
    private formBuilder: FormBuilder,
    private solicitudMentoriaSerive: SolicitudMentoriaService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.doRefresh();
    this.getRegistroMentorias();
    this.getSolicitudesMentoria();
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.getMateriasCarrera();
    this.formSolicitudM= this.formBuilder.group({
      nombre_materia: new FormControl('', Validators.required),
      tema:new FormControl('', Validators.required),
       
    })
    this.solicitudM= new SolicitudMentoria();
  }
  segmenntChange(event: any) {
    this.valueSelected = event.detail.value;
    console.log(this.valueSelected);
  }
  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.getRegistroMentorias();
    if ($event) {
      $event.target.complete();
    }
  }

  loadData(event) {
    console.log(event, 'el evento');
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.registroMentorias.length == 9) {
        event.target.disabled = true;
        
      }
    }, 500);
  }

  getMateriasCarrera() {
    this.registroCarrera.getMateriaEstudiante(this.datos.carrera).subscribe(
      (res) => {
        this.materiasC = res;
      
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getRegistroMentorias() {
    var UsuMentoria = [];
    this.regitroMentoriasService.getRegistroMentorias().subscribe(
      (res) => {
        console.log('las mentorias', res);
        for (let usu1 of res) {
          this.localTime = moment(usu1.fecha).format('DD/MM/YYYY');
          if (usu1.carrera == this.datos.carrera) {
            usu1.fecha = this.localTime;
            UsuMentoria.push(usu1);
          }
        }
       
        if (UsuMentoria.length > 0) {
          this.registroMentorias = UsuMentoria;
        } else {
          this.mensaje = 'No existe mentorias disponibles';
          this.altert = true;
        }

      },
      (err) => {
        console.log(err);
      }
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mentoria Seleccionada',

      message: '¿Decea confirmar la solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {
            console.log('Confirmar');
            this.detalle(this.registroM.id_registro_mentoria);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async getMentoria(id: number) {
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();
    console.log('id_registro_mentoria ', id);
    this.regitroMentoriasService.getRegistroMentoria(id).subscribe(
      (res) => {
        this.registroM = res;
        this.localTime = moment(this.registroM.fecha).format('DD/MM/YYYY');

        console.log('el registro', this.registroM);

        this.presentAlert();
      },
      () => {}
    );
  }
  async detalle(id: number) {
    console.log('id_registro_mentoria ', id);
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();
    this.datos = JSON.parse(localStorage.getItem('payload'));
    console.log(this.datos.id_usuario);
    console.log(id);
    this.agendarMentoria.id_registro_mentoria = id;
    this.agendarMentoria.id_usuario = this.datos.id_usuario;

    console.log('el registro', this.agendarMentoria);
    this.regitroAgendarMentoriaService
      .saveAgendarMentoria(this.agendarMentoria)
      .subscribe(
        (res) => {
          this.mensajeServices.presentToast('Mentoria Agendada correctamente');
          this.router.navigate(['/menu-opciones/tabs/home-superior']);
        },
        () => {
          loading.dismiss();
          this.mensajeServices.presentAlert(
            'Error',
            'Hubo un problema al guardar'
          );
        }
      );
    //  this.router.navigate(['/agendar-mentoria/',id]);
  }



  async saveSolicitudMentoria() {
    this.solicitudM.nombre_materia=this.formSolicitudM.controls['nombre_materia'].value,
   this.solicitudM.nombre_carrera=this.datos.carrera,
   this.solicitudM.tema=this.formSolicitudM.controls['tema'].value,
   this.solicitudM.id_usuario=this.datos.id_usuario
  
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();


    this.solicitudMentoriaSerive
      .saveSolicitudMentoria(this.solicitudM)
      .subscribe(
        (res) => {
          loading.dismiss();
          if (res) {
            this.getSolicitudesMentoria();
            this.mensajeServices.presentToast('Solicitud enviada');
            
            
          }
        },
        () => {
          loading.dismiss();
          this.mensajeServices.presentAlert(
            'Error',
            'Hubo un problema al guardar'
          );
        }
      );
  }
  async getSolicitudesMentoria() {
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();
   
    this.solicitudMentoriaSerive.getSolicitudMentoria(this.datos.id_usuario).subscribe(
      (res:any) => {
      this.solicitudesEst=res;

        console.log("res",res)
      },
      () => {}
    );
  }
}
