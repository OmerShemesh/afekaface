import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { PostsService } from './posts.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { AuthProvider } from '../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.css'],
  providers:[PostsService]

})
export class PostsComponent implements OnInit {
  postText:string;
  privatePost:boolean;

  myPosts:FirebaseListObservable<any>;


  constructor(private loading:LoadingService, private pService:PostsService,private route:ActivatedRoute,private auth:AuthProvider) {
    this.postText = "";
    this.privatePost = false;
    
    this.myPosts = pService.getUserPosts(this.auth.getUserId());
    this.loading.stop();
  }
  post(){
    this.pService.post(this.auth.getUserId(),this.postText,this.privatePost);
    this.postText = "";
  }
  ngOnInit() {
   
  }

}
