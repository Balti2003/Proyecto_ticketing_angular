import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/interfaces';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: (res) => {
        this.tickets = res.results || res;
      },
      error: (err) => {
        console.error('Error fetching tickets:', err);
      },
    });
  }
}
