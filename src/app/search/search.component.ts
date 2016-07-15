import { Component, OnInit } from '@angular/core';
import { SearchPipe }  from './search.pipe'
import { FirebaseListObservable } from 'angularfire2';
import { AuthProvider } from '../auth/auth.service';
import { FriendsService } from '../friends.service';
@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  providers: [FriendsService],
  pipes: [SearchPipe]

})
export class SearchComponent implements OnInit {

  users: FirebaseListObservable<any>;
  query: string;
  currentUser: string;
 
  constructor(private auth: AuthProvider, private fService: FriendsService) {
    this.query = "";
    this.users = auth.getUsers();
    this.currentUser = auth.getUserId();

  }

  addFriend(friendId:string) {
    this.fService.addFriend(friendId);
  }
  
  removeFriend(friendId:string){
    this.fService.removeFriend(friendId);

  }
  ngOnInit() {

  }

}
