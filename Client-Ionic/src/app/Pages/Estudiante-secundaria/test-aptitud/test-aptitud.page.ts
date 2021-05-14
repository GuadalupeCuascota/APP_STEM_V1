import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-aptitud',
  templateUrl: './test-aptitud.page.html',
  styleUrls: ['./test-aptitud.page.scss'],
})
export class TestAptitudPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("pasa test aptitud")
  }

}
