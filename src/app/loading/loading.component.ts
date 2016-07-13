import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  moduleId: module.id,
  selector: 'loading-indicator',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.css'],
})
export class LoadingComponent {

   public active: boolean;

   constructor(private loading: LoadingService) {
    this.loading.status.subscribe((status: boolean) => {
      this.active = status;
      console.log(status);
    });
  }
}


