import { Injectable } from '@angular/core';
import { AuthProvider } from './auth/auth.service';
import { FirebaseListObservable, AngularFire } from 'angularfire2';


@Injectable()
export class FriendsService {

    currentUser: string;
    friendsList:Array<any>;

	constructor(private af: AngularFire, private auth: AuthProvider) {
        this.friendsList = [];
        this.currentUser = this.auth.getUserId();
        this.af.database.list(`users/${this.currentUser}/friends`).flatMap((friends) => friends).subscribe((friend)=>this.friendsList.push(friend));
    }   
    addFriend(friendId: string) {
        this.af.database.object(`users/${this.currentUser}/friends/${friendId}`).set({isFriend:true});
        this.af.database.object(`users/${friendId}/friends/${this.currentUser}`).set({isFriend:true});
    }

    removeFriend(friendId:string){
        var index = this.friendsList.map(function(item){return item.$key}).indexOf(friendId);
        if(index!=-1)
        {
             this.friendsList.splice(index,1);
        }
        this.af.database.list(`users/${this.currentUser}/friends`).remove(friendId);
        this.af.database.list(`users/${friendId}/friends`).remove(this.currentUser);   
    }
    contains(id) {
        return this.friendsList.map(function(item){return item.$key}).indexOf(id) != -1;
 	}
    getFriends(){
        return this.friendsList;
    }
   
}