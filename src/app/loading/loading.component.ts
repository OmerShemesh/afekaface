import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'loading-indicator',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}


export class Loading{
    public loading: boolean;
    constructor(val: boolean) {
        this.loading = val;
    }
    standby() {
        this.loading = true;
    }
    ready() {
        this.loading = false;
    }
}