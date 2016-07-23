import { Injectable,Input } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { DateService } from '../date.service';
import { FriendsService } from '../friends.service';

@Injectable()
export class CommentsService {

    constructor(private af:AngularFire,private fService:FriendsService,private dService:DateService) { }

    getPostComments(userId,postId){
        return this.af.database.list(`timeline/${userId}/${postId}/comments`);

    }

    addComment(userId,name,text,postId,postWriter){
        let comment = {user_id:userId,name:name,text:text,date:this.dService.convertTimestamp(Date.now())};
   
        let key = this.af.database.list(`timeline/${postWriter}/${postId}/comments`).push(comment).getKey();
        let friends = this.fService.getPostFriends(postWriter);
        this.af.database.object('/').update(this.fanoutComment(friends,key,postId,comment));

    }

    fanoutComment(friends,commentId,postId,comment){
        let fanoutObject = {};
        friends.forEach(element => {
            fanoutObject[`/timeline/${element.$key}/${postId}/comments/${commentId}`] = comment;
        });
        return fanoutObject;

    }
    removeComment(userId,postId,commentId){
        let friends = this.fService.getPostFriends(userId);
        this.af.database.object('/').update(this.fanoutRemoveComment(postId,commentId,userId,friends));
    }
    fanoutRemoveComment(postId,commentId,userId,friends){
        let fanoutObject = {};
        fanoutObject[`/timeline/${userId}/${postId}/comments/${commentId}`] = null;
        friends.forEach(element => {
           fanoutObject[`/timeline/${element.$key}/${postId}/comments/${commentId}`] = null;
        });
        return fanoutObject;
    }
    getUserProfilePic(userId) {
        let profilepic = "";
        this.af.database.object(`users/${userId}`).subscribe((userData) => {
            profilepic = userData.profile_pic;
        })
        return profilepic;
    }
}