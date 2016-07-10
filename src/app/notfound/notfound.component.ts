import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-notfound',
  template:'<h1>404: Not found</h1>',
  styleUrls: ['notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
