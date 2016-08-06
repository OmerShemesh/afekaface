import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchPipe }  from './search.pipe'
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthProvider } from '../auth/auth.service';
import { FriendsService } from '../friends.service';
import { LoadingService } from '../loading/loading.service';


declare var toastr;
@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  providers: [FriendsService],
  pipes: [SearchPipe],
  directives: []

})
export class SearchComponent implements OnInit {

  users: any;
  query: string;
  currentUser: string;


  constructor(private af: AngularFire, private auth: AuthProvider, private fService: FriendsService, private loading: LoadingService) {

  }

  addFriend(friendId: string) {

    this.fService.addFriend(friendId);
    this.loading.start();
    this.updateTimeline(this.currentUser, friendId);
    setTimeout(() => {
      this.loading.stop();
      toastr.info("Added new Friend!");
    }, 1000);



  }


  updateTimeline(currentUser, friendId) {
    
    this.af.database.list(`timeline/${friendId}`, {
      query: {
        orderByChild: 'user_id',
        equalTo: friendId
      }
    }).subscribe((posts) => {
      let obj = {};
      posts.forEach(element => {
        if (element.comments)
          obj[`timeline/${currentUser}/${element.$key}`] = { comments: element.comments, date: element.date, date_stamp: element.date_stamp, likes: { liked: false, value: element.likes.value }, name: element.name, private: element.private, text: element.text, user_id: element.user_id };
        else
          obj[`timeline/${currentUser}/${element.$key}`] = { date: element.date, date_stamp: element.date_stamp, likes: { liked: false, value: element.likes.value }, name: element.name, private: element.private, text: element.text, user_id: element.user_id };

      });
      console.log(posts);
      this.af.database.object('/').update(obj);
    });


    this.af.database.list(`timeline/${currentUser}`, {
      query: {
        orderByChild: 'user_id',
        equalTo: currentUser
      }
    }).subscribe((posts) => {
      let obj = {};
      posts.forEach(element => {
        if (element.comments)
          obj[`timeline/${friendId}/${element.$key}`] = { comments: element.comments, date: element.date, date_stamp: element.date_stamp, likes: { liked: false, value: element.likes.value }, name: element.name, private: element.private, text: element.text, user_id: element.user_id };
        else
          obj[`timeline/${friendId}/${element.$key}`] = { date: element.date, date_stamp: element.date_stamp, likes: { liked: false, value: element.likes.value }, name: element.name, private: element.private, text: element.text, user_id: element.user_id };
      });
      this.af.database.object('/').update(obj);
    });


  }
  ngOnInit() {
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
    this.query = "";
    this.users = this.af.database.list('/users');
    this.currentUser = this.auth.getUserId();
  }

}
