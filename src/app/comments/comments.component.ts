import { Component, OnInit,Input,ViewEncapsulation } from '@angular/core';
import { AuthProvider } from '../auth/auth.service';
import { CommentsService } from './comments.service';

@Component({
  moduleId: module.id,
  selector: 'comment-list',
  templateUrl: 'comments.component.html',
  styleUrls:['comments.component.css'],
  providers:[CommentsService],
  encapsulation: ViewEncapsulation.None
})
export class CommentsComponent implements OnInit {

  currentUserName: string;
  @Input() comments:any[];
  commentText:string;
  @Input() post_id : string;
  @Input() post_writer:string;
  commentKeys:any[];

  constructor(private auth:AuthProvider,private cService:CommentsService) {
     
   

  }

  addComment()
  {
    
   
    if(this.commentText != "")
      this.cService.addComment(this.auth.getUserId(),this.currentUserName,this.commentText,this.post_id,this.post_writer);
  }

  ngOnInit() {
      
      this.commentText = "";
      this.auth.getUserData().subscribe((user) => this.currentUserName = user.name);
      if(this.comments != null)
        this.commentKeys = Object.keys(this.comments);
      
  }
  removeComment(commentId)
  {
    this.cService.removeComment(this.auth.getUserId(),this.post_id,commentId);
  }
}
