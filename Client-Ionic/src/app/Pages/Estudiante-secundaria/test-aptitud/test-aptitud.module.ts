import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestAptitudPageRoutingModule } from './test-aptitud-routing.module';

import { TestAptitudPage } from './test-aptitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestAptitudPageRoutingModule
  ],
  declarations: [TestAptitudPage]
})
export class TestAptitudPageModule {}
