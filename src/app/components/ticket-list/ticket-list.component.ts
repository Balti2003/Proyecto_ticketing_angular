import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ticket } from '../../models/interfaces';
import { TicketService } from '../../services/ticket.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  searchTerm: string = '';
  statusFilter: string = '';
  priorityFilter: string = '';

  constructor(
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    const filters = {
      search: this.searchTerm || undefined,
      status: this.statusFilter || undefined,
      priority: this.priorityFilter || undefined,
    };

    this.ticketService.getTickets(filters).subscribe({
      next: (res: any) => {
        this.tickets = [...res.results];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching tickets:', err);
      }
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.priorityFilter = '';
    this.loadTickets();
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
