import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { YoutubePipe } from './youtube.pipe';



@NgModule({
  declarations: [FiltroPipe, YoutubePipe],
  exports:[FiltroPipe,YoutubePipe],
  
})
export class PipesModule { }
