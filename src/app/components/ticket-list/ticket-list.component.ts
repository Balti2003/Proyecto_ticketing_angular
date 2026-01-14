import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ticket } from '../../models/interfaces';
import { TicketService } from '../../services/ticket.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: (res: any) => {
        this.tickets = [...res.results];

        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error('Error fetching tickets:', err);
      }
    });
  }

  deleteTicket(id: string | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => {
          this.tickets = this.tickets.filter(ticket => ticket.id !== id);
          alert('Ticket deleted successfully');
        },
        error: (err) => {
          alert(err.error.message || 'Error deleting ticket');
        }
      });
    }
  }
}
