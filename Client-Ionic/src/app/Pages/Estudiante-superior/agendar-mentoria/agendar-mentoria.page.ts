import { Component, OnInit } from '@angular/core';
import { AgendarMentoriaService } from 'src/app/Services/agendar-mentoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { LoadingService } from 'src/app/Services/loading.service';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { AgendarMentoria } from 'src/app/Models/agendarMentoria';
import { AlertController, NavController } from '@ionic/angular';
import { RegistroMentoriasService } from 'src/app/Services/registro-mentorias.service';
import { RegistroMentorias } from 'src/app/Models/registro-mentorias';
@Component({
  selector: 'app-agendar-mentoria',
  templateUrl: './agendar-mentoria.page.html',
  styleUrls: ['./agendar-mentoria.page.scss'],
})
export class AgendarMentoriaPage implements OnInit {
  datos: any = {};
  registroM: RegistroMentorias;
  Horarios: any[] = [];
  localTime = moment().format();
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
  params = this.actRoute.snapshot.params.id;
  constructor(
    private actRoute: ActivatedRoute,
    private mensajeServices: MensajesService,
    private loadinServices: LoadingService,
    private router: Router,
    private navController: NavController,
    private regitroMentoriasService: RegistroMentoriasService,
    private regitroAgendarMentoriaService: AgendarMentoriaService,
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    this.buscarHorario();
    
    this.datos = JSON.parse(localStorage.getItem('payload'));
  }

  async buscarHorario() {
    var RegistroHorario = [];
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();
    this.regitroMentoriasService
      .getRegistrohorarioMentoria(this.params)
      .subscribe(
        (res: any) => {
          for (let horario of res) {

          console.log("la fecha",horario.fecha)
            this.localTime = moment(horario.fecha).format('DD/MM/YYYY');
            horario.fecha = this.localTime;
            RegistroHorario.push(horario);
          }
          this.Horarios = RegistroHorario;
        },
        (err) => {
          console.log(err);
        }
      );
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
        (err) => {
          loading.dismiss();
          this.mensajeServices.presentAlert(
            'Error',
            'La mentoria ya ha sido agendada!!'
          );
        }
      );
    //  this.router.navigate(['/agendar-mentoria/',id]);
  }
}
