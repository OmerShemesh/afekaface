import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  moduleId: module.id,
  selector: 'loading-indicator',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.css'],
  providers:[LoadingService]
})
export class LoadingComponent {

   public active: boolean;

  public constructor(loading: LoadingService) {
    loading.status.subscribe((status: boolean) => {
      this.active = status;
    });
  }
}


