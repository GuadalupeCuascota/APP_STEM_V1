import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/Models/usuario';
import { LoadingService } from 'src/app/Services/loading.service';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {
  formGroup: FormGroup;
  respuesta: any = {};
  correo_electronico = '';
  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,private router: Router,
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      correo_electronico: new FormControl('', Validators.required),
    });
  }
  recuperarPass() {
    this.correo_electronico = this.formGroup.controls['correo_electronico'].value;
    console.log('el correo', this.correo_electronico);
    this.usuarioService.RecuperarPass(this.correo_electronico).subscribe(
        (res) => {
          this.respuesta = res;
            console.log(this.respuesta.text);
            if (this.respuesta.text == 'Dato encontrado') {
              this.router.navigate(['/cambiar-contrasenia/'+this.correo_electronico]);
                
            }
        },
        (err) => {
          console.log(err);
        }
      );

    
  }
}
