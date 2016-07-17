import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { PostsService } from './posts.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { AuthProvider } from '../auth/auth.service';
import { FriendsService } from '../friends.service';


@Component({
  moduleId: module.id,
  selector: 'app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.css'],
  providers:[PostsService,FriendsService]

})
export class PostsComponent implements OnInit {
  
  postText:string;
  privatePost:boolean;
  currentUserName:string;
  myPosts;

  
  constructor(private loading:LoadingService, private pService:PostsService,private route:ActivatedRoute,private auth:AuthProvider) {
    this.postText = "";
    this.privatePost = false;
    
    //this.myPosts = pService.getUserPosts(this.auth.getUserId());
    this.loading.start();
    this.auth.getUserData().subscribe((user)=>this.currentUserName=user.name);
    this.myPosts = this.pService.getUserPosts(this.auth.getUserId());
    setTimeout(() => {
      this.loading.stop();
    }, 1500);
   
   
   
  }
  addPost(){
    this.pService.addPost(this.auth.getUserId(),this.currentUserName,this.postText,this.privatePost);
    this.postText = "";
  }
  ngOnInit() {
   
  }
 

}
