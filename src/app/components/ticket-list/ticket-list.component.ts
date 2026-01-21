import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ticket } from '../../models/interfaces';
import { TicketService } from '../../services/ticket.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

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
    public authService: AuthService,
    private alertService: AlertService
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
    if (this.currentPage < this.totalPages) {
      this.loadTickets(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadTickets(this.currentPage - 1);
    }
  }

  async deleteTicket(id: string | undefined) {
    if (!id) return;

    const result = await this.alertService.confirm(
      "Estas seguro?",
      "No podras revertir esto!"
    );

    if (result.isConfirmed) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => {
          this.tickets = this.tickets.filter(t => t.id !== id);
          this.alertService.success('El ticket ha sido eliminado.');
        },
        error: (err) => this.alertService.error('No tienes permisos para eliminar.')
      });
    }
  }
}

