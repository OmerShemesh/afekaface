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
  comments;
  commentText:string;
  @Input() post_id : string;
  @Input() post_writer:string;
  constructor(private auth:AuthProvider,private cService:CommentsService) {
     this.commentText = "";
     this.auth.getUserData().subscribe((user) => this.currentUserName = user.name);
   

  }

  addComment()
  {
    let elem = <HTMLInputElement>document.getElementById('cText');
    if(elem.validity.valid)
      this.cService.addComment(this.auth.getUserId(),this.currentUserName,this.commentText,this.post_id,this.post_writer);
  }

  ngOnInit() {
      this.comments = this.cService.getPostComments(this.auth.getUserId(),this.post_id);
  }

}
