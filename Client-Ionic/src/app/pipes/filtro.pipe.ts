import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[],texto:string ):any [] {
    console.log("PASA")
    if(texto==''){

      return arreglo
    
    }else{
     
      texto=texto.toLowerCase();
      console.log(texto)
      return arreglo.filter(item=>{
      return  item.nombre_perfil.toLowerCase().includes(texto)
        
      }
      );
      
      

    }
    
    // texto=texto.toLowerCase();
    // console.log("el texto",texto)

    // return arreglo.filter(item=>item.nombre_perfil=="a");
     

      // return item.profesion.toLowerCase().include(texto)
    
    return  arreglo
  }

}
