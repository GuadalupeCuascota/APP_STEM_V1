import { Component, OnInit, ViewChild } from '@angular/core';
import { TestAptitudService } from '../../../Services/test-aptitud.service';
import { testAptitud } from 'src/app/Models/testAptitud';
@Component({
  selector: 'app-test-aptitud',
  templateUrl: './test-aptitud.page.html',
  styleUrls: ['./test-aptitud.page.scss'],
})
export class TestAptitudPage implements OnInit {
  @ViewChild('slides') slides: any;
  test: testAptitud[] = [];
  option_selected: string = '';
  testCarrera = '';
  const = 0;
  constElec = 0;
  pregunta: testAptitud[] = [];

  opciones = [
    {
      opcion: '',
    },
  ];
  preguntas = '';

  constructor(private testAptitud: TestAptitudService) {}

  ngOnInit() {
    console.log('pasa test aptitud');
    // this.getTestAptitud();
    this.test = this.testAptitud.getTest();
    console.log('test:', this.test);
  }

  selectRes(event: any) {
    console.log(event);
    this.option_selected = event.detail.value;
    for (let aux of this.test) {
      console.log(aux[0].carrera)
      // if(aux.carrera=="Textil"){
      //   console.log("pasa textil")
      //   this.const = this.const + parseInt(this.option_selected);
        
      // }
      // if(aux.carrera=="Electricidad"){

      //   this.constElec= this.constElec + parseInt(this.option_selected);
        
      // }
      
    }

    console.log(this.const);
    console.log(this.constElec);
  }
  getTestAptitud() {
    var con = [];
    console.log('pasa test');
    this.testAptitud.gettest().subscribe((res: any) => {
      for (let c of res) {
        const op = c.opcion;

        let opciones = {
          opcion: op,
        };
        con.push(opciones);
      }
      this.opciones = con;
      console.log('op', this.opciones);
      this.pregunta = res;
      console.log('las opciones', this.pregunta);
    });
  }
  siguiente() {
    console.log(this.test.length);
    this.const = this.const + 1;
    if (this.const < this.test.length) {
    }
  }
  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
}
