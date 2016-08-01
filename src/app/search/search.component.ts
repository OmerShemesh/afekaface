import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchPipe }  from './search.pipe'
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthProvider } from '../auth/auth.service';
import { FriendsService } from '../friends.service';



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

  users: FirebaseListObservable<any>;
  query: string;
  currentUser: string;
  @Output() alert = new EventEmitter();

  constructor(private af: AngularFire, private auth: AuthProvider, private fService: FriendsService) {

  }

  addFriend(friendId: string) {
    this.fService.addFriend(friendId);
    //this.alert.emit("Added New Friend!");
    toastr.info("Added new Friend!");
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
