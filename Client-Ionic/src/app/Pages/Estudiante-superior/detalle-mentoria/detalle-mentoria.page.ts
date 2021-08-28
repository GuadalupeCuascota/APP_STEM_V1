import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { RegistroMentorias } from 'src/app/Models/registro-mentorias';
import { LoadingService } from 'src/app/Services/loading.service';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { RegistroMentoriasService } from 'src/app/Services/registro-mentorias.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AgendarMentoria } from 'src/app/Models/agendarMentoria';
import { AgendarMentoriaService } from 'src/app/Services/agendar-mentoria.service';
@Component({
  selector: 'app-detalle-mentoria',
  templateUrl: './detalle-mentoria.page.html',
  styleUrls: ['./detalle-mentoria.page.scss'],
})
export class DetalleMentoriaPage implements OnInit {
  localTime = moment().format();
  //  time=moment().format();
  //  time1=moment().format();

  nombre = '';
  apellido = '';
  tipo = '';
  hora_inicio='';
  hora_fin='';
  id_registro_mentoria = 0;
  status: '';
  registroM: RegistroMentorias;

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
  datos: any = {};
  formGroup: FormGroup;
  constructor(
    private regitroMentoriasService: RegistroMentoriasService,
    private actRoute: ActivatedRoute,
    private mensajeServices: MensajesService,
    private loadinServices: LoadingService,
    private router: Router,
    public alertController: AlertController,
    private regitroAgendarMentoriaService: AgendarMentoriaService
  ) {}
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      subHeader: '',
      message: '¿Desea guardar la mentoria seleccionada?',
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
            this.detalle(this.id_registro_mentoria);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async ngOnInit() {
   
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();
    const params = this.actRoute.snapshot.params;
    if (params && params.id) {
      this.regitroMentoriasService.getRegistroMentoria(params.id).subscribe(
        (res) => {
          console.log('registro', res);
          this.registroM = res;
          
          this.localTime = moment(this.registroM.fecha).format('DD/MM/YYYY');
          //  this.time=moment(this.registroM.hora_inicio).format('h:mm a');
          //  this.time1=moment(this.registroM.hora_fin).format('h:mm a');
          this.nombre = this.registroM.nombre;
          this.apellido = this.registroM.apellido;
          this.hora_inicio=this.registroM.hora_inicio;
          this.hora_fin=this.registroM.hora_fin;
          this.tipo = this.registroM.tipo_mentoria;
          this.id_registro_mentoria = this.registroM.id_registro_mentoria;
          console.log('t', this.nombre);
        },
        () => {}
      );
    } else {
    }
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
}
