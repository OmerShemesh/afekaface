import { Component, OnInit, trigger, state, style, transition, animate}  from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { PostsService } from './posts.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { AuthProvider } from '../auth/auth.service';
import { FriendsService } from '../friends.service';
import { DateService } from '../date.service';
import { StorageService } from '../storage.service';
import { CommentsComponent } from '../comments/comments.component';

declare var toastr;
@Component({
  moduleId: module.id,
  selector: 'app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.css'],
  providers: [PostsService, FriendsService, DateService, StorageService],
  directives: [CommentsComponent]

})
export class PostsComponent implements OnInit {

  postText: string;
  privatePost: boolean;
  currentUserName: string;

  pics: any;
  myPosts;
  modalUrl;


  constructor(private loading: LoadingService, private pService: PostsService, private route: ActivatedRoute, private auth: AuthProvider) {




  }
  addPost() {
    this.postText = this.postText.replace(/\n/g, '<br>');
    this.pService.addPost(this.auth.getUserId(), this.currentUserName, this.postText, this.privatePost, this.pics);
    this.postText = "";
    this.pics = [];
    this.privatePost = false;
  }
  removePost(postId) {
    this.pService.removePost(postId, this.auth.getUserId());
  }
  likePost(liked, post_writer, postId) {
    if (!liked)
      this.pService.likePost(postId, post_writer, this.auth.getUserId());
    else
      toastr.warning("Already liked this post!");

  }
  onFileSelect(e: any) {
    if (e.srcElement.files.length == 0)
      this.pics = [];
    else {
      this.pics = [];
      for (let i = 0; i < e.srcElement.files.length; i++) {
        this.pics.push(e.srcElement.files[i]);
      }
    }
  }

  getModalUrl(url) {
    this.modalUrl = url;
  }

  changePostPermissions(postId, userId, value) {

    this.pService.changePostPermissions(postId, userId, value);
    toastr.info(`Post is now ${value ? 'Private' : 'Public'}` );

  }

  ngOnInit() {
    this.postText = "";
    this.modalUrl = "";
    this.privatePost = false;
    this.pics = [];
    this.loading.start();
    this.auth.getUserData().subscribe((user) => this.currentUserName = user.name);
    this.myPosts = this.pService.getUserPosts(this.auth.getUserId());
    toastr.options = {
      "closeButton": true,
      "progressBar": true,
      "positionClass": "toast-top-center",
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "3000",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    setTimeout(() => {
      this.loading.stop();
    }, 1000);

     
  }


}
