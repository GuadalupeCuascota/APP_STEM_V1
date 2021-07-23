import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-menu-tabs1',
  templateUrl: './menu-tabs1.page.html',
  styleUrls: ['./menu-tabs1.page.scss'],
})
export class MenuTabs1Page implements OnInit {
  selectedTab: any;
  @ViewChild('tabs',{static: false}) tabs: IonTabs;
  constructor() { }

  ngOnInit() {
  }
  setCurrentTab(){
    this.selectedTab=this.tabs.getSelected();
    console.log("ES",this.selectedTab)
  }
}
