import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  moduleId: module.id,
  selector: 'loading-indicator',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.css'],
})
export class LoadingComponent implements OnInit {

  public active: boolean;

  constructor(private loading: LoadingService) {


  }
  ngOnInit() {
    this.loading.status.subscribe((status: boolean) => {
      this.active = status;

    });
  }
}


