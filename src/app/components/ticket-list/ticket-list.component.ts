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

  //variables for pagination
  currentPage: number = 1;
  totalPages: number = 1;
  totalTickets: number = 0;

  //variables for filters
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

  loadTickets(page: number = 1): void {
    this.currentPage = page;

    const filters = {
      search: this.searchTerm || undefined,
      status: this.statusFilter || undefined,
      priority: this.priorityFilter || undefined,
      page: page
    };

    this.ticketService.getTickets(filters).subscribe({
      next: (res: any) => {
        this.tickets = [...res.results];
        this.cdr.detectChanges();
        this.totalPages = res.pages;
        this.totalTickets = res.total;
        console.log("Cargada página:", res.currentPage);
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

  nextPage(): void {
    console.log('Intentando ir a la página:', this.currentPage + 1);
    if (this.currentPage < this.totalPages) {
      this.loadTickets(this.currentPage + 1);
    }
  }

  prevPage(): void {
    console.log('Intentando ir a la página:', this.currentPage - 1);
    if (this.currentPage > 1) {
      this.loadTickets(this.currentPage - 1);
    }
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
