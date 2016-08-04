import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-notfound',
  template:
    `<div class="container col-md-5 col-md-offset-4">
      <h1>404 Not Found</h1>
    </div>`,
  styleUrls: ['notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
