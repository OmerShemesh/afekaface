import { Injectable } from '@angular/core';
import { AuthProvider } from './auth/auth.service';
import { FirebaseListObservable, AngularFire } from 'angularfire2';


@Injectable()
export class FriendsService {

    currentUser: string;
    friendsList:Array<any>;
    postFriends:Array<any>;
	constructor(private af: AngularFire, private auth: AuthProvider) {
        this.friendsList = [];
        this.postFriends = [];
        this.currentUser = this.auth.getUserId();
        this.af.database.list(`users/${this.currentUser}/friends`).flatMap((friends) => friends).subscribe((friend)=>this.friendsList.push(friend));
    }   
    addFriend(friendId: string) {
        this.af.database.object(`users/${this.currentUser}/friends/${friendId}`).set(true);
        this.af.database.object(`users/${friendId}/friends/${this.currentUser}`).set(true);
    }
    contains(id) {
        return this.friendsList.map(function(item){return item.$key}).indexOf(id) != -1;
 	}
    getFriends(){
        return this.friendsList;
    }
    private _getPostFriends(postWriter){
         this.af.database.list(`users/${postWriter}/friends`).flatMap((friends) => friends).subscribe((friend)=>this.postFriends.push(friend));
    }
    getPostFriends(postWriter){
        this._getPostFriends(postWriter);
        return this.postFriends;
    }

   
}