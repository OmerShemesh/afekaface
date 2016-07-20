import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { PostsService } from './posts.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { AuthProvider } from '../auth/auth.service';
import { FriendsService } from '../friends.service';
import { DateService } from '../date.service';
import { StorageService } from '../storage.service';
import { CommentsComponent } from '../comments/comments.component';


@Component({
  moduleId: module.id,
  selector: 'app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.css'],
  providers: [PostsService, FriendsService, DateService,StorageService],
  directives:[CommentsComponent]

})
export class PostsComponent implements OnInit {

  postText: string;
  privatePost: boolean;
  currentUserName: string;
  error: any;
  pics: any;
  myPosts;
  modalUrl;


  constructor(private loading: LoadingService, private pService: PostsService, private route: ActivatedRoute, private auth: AuthProvider) {
    this.postText = "";
    this.modalUrl = "";
    this.privatePost = false;
    this.pics = [];
    //this.myPosts = pService.getUserPosts(this.auth.getUserId());
    this.loading.start();
    this.auth.getUserData().subscribe((user) => this.currentUserName = user.name);
    this.myPosts = this.pService.getUserPosts(this.auth.getUserId());
    setTimeout(() => {
      this.loading.stop();
    }, 1500);



  }
  addPost() {
    this.pService.addPost(this.auth.getUserId(), this.currentUserName, this.postText, this.privatePost,this.pics);
    this.postText = "";
    this.pics = [];
  }

  onFileSelect(e: any) {
    let elem = <HTMLInputElement>document.getElementById("pics");
    let ok = true;

    for (let i = 0; i < e.srcElement.files.length; i++) {

      console.log("check");
      let filename = e.srcElement.files[i].name;
      if (['jpg', 'png', 'gif'].indexOf(filename.substr(filename.lastIndexOf('.') + 1)) === -1) {
        this.error = "Please Use A valid image file! (jpg,png,gif)";
        elem.value = "";
        ok = false;
        break;

      }
    }

    if (ok) {
      this.error = "";
      for (let i = 0; i < e.srcElement.files.length; i++) {
        this.pics.push(e.srcElement.files[i]);
      }
    }
  }

  getModalUrl(url){
    this.modalUrl = url;
  }

  changePostPermissions(postId,userId,value){

    this.pService.changePostPermissions(postId,userId,value);


  }

  ngOnInit() {

  }


}
