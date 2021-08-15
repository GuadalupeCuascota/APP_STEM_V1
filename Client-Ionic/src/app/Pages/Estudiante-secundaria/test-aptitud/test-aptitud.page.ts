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
  test:testAptitud[]=[];
  pregunta:testAptitud[]=[];
  opciones = [
    {
      opcion: '',
     
    },
  ];
preguntas=""
const=0;

  constructor(private testAptitud: TestAptitudService) { }

  ngOnInit() {
    console.log("pasa test aptitud")
    this.getTestAptitud();
    this.test=this.testAptitud.getTest();
    
    console.log("test:",this.test)
    console.log("const",this.const)

  }
  getTestAptitud() {
    var con = [];
    console.log('pasa test');
    this.testAptitud.gettest()
      .subscribe((res: any) => {
        for (let c of res) {
          
          const op = c.opcion;

          let opciones = {
           opcion:op
          };
          con.push(opciones);
        
        }
        this.opciones=con
      console.log("op",this.opciones)
        this.pregunta=res;
        console.log("las opciones" ,this.pregunta)
        
      });
  }
  siguiente(){
    console.log(this.test.length)
    this.const=this.const+1
    if(this.const<this.test.length){
     
    }

  }
  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
}


}
