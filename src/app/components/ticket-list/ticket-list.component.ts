import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ticket } from '../../models/interfaces';
import { TicketService } from '../../services/ticket.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { ExcelService } from '../../services/excel.service';

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

  //variables for onlyMyTickets filter
  onlyMyTickets: boolean = false;
  currentUserId: string | null = "";

  constructor(
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService,
    private alertService: AlertService,
    private excelService: ExcelService
  ) {
    this.currentUserId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(page: number = 1): void {
    this.currentPage = page;

    const userId = this.authService.getUserId();
    console.log('ID del usuario actual:', userId); // Para depurar
    console.log('¿Filtrar solo mis tickets?:', this.onlyMyTickets);
  
    const filters: any = {
      search: this.searchTerm || undefined,
      status: this.statusFilter || undefined,
      priority: this.priorityFilter || undefined,
      page: page
    };

    if (this.onlyMyTickets && userId) {
      filters.user = userId;
    }

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

    if (this.authService.getUserRole() !== 'admin') {
      this.alertService.error('Acceso denegado. Solo los administradores pueden eliminar tickets.');
      return;
    }

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
        error: (err) => {
          this.alertService.error(err.error.message || 'No tienes permisos para realizar esta acción');
        }
      });
    }
  }

  toggleMyTickets(): void {
    this.onlyMyTickets = !this.onlyMyTickets;
    this.loadTickets(1);
  }

  isUrgentAndOld(ticket: any): boolean {
    if (!ticket.createdAt || ticket.priority !== 'high' || ticket.status === 'closed') return false;

    const createdDate = new Date(ticket.createdAt).getTime();
    const now = new Date().getTime();
    const hoursPassed = (now - createdDate) / (1000 * 60 * 60);

    return hoursPassed > 24;
  }

  downloadReport(): void {
    if (!this.tickets || this.tickets.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const dataToExport = this.tickets.map(t => ({
      'Referencia': t.id?.substring(0, 8),
      'Título': t.title,
      'Prioridad': t.priority?.toUpperCase(),
      'Estado': t.status?.toUpperCase(),
      'Fecha de Creación': t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A',
      'Descripción': t.description
    }));

    this.excelService.exportToExcel(dataToExport, 'Reporte_Tickets');
  }
}

