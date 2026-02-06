import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetailComponent implements OnInit {
  ticket: any;
  comments: any[] = [];
  newCommentText: string = '';
  ticketId: string = '';

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id')!;
    this.loadTicket();
    this.loadComments();
  }

  loadTicket() {
    this.ticketService.getTicketById(this.ticketId).subscribe(res => {
      this.ticket = res.ticket;
    });
  }

  loadComments() {
    this.commentService.getCommentsByTicket(this.ticketId).subscribe(res => {
      this.comments = res;
    });
  }

  sendComment() {
    if (!this.newCommentText.trim()) return;
    this.commentService.addComment(this.ticketId, this.newCommentText).subscribe(newComment => {
      this.comments = [...this.comments, newComment];
      this.newCommentText = '';
    });
  }

  changeStatus(newStatus: string) {
    this.ticketService.updateTicketStatus(this.ticketId, newStatus).subscribe({
      next: (res) => {
        this.ticket.status = newStatus;
        this.commentService.addComment(this.ticketId, `Status changed to ${newStatus}`).subscribe(newComment => {
          this.comments.push(newComment);
        });
      },
      error: (err) => console.error('Error changing status', err),
    });
  }
} 