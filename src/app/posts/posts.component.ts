import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading/loading.service';

@Component({
  moduleId: module.id,
  selector: 'app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.css'],

})
export class PostsComponent implements OnInit {

  constructor(private loading:LoadingService) {}

  ngOnInit() {
    this.loading.stop();
  }

}
