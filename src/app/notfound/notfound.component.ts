import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-notfound',
  template:
    `<div class="container col-md-5 col-md-offset-4">
      <h1>404 Not Found</h1>
      <a style="margin-left:100px" title="Go Back Home" href="/"><i class="fa fa-home fa-3x"></i><i class="fa fa-hand-o-left fa-3x" ></i></a>
    </div>`,
  styleUrls: ['notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
