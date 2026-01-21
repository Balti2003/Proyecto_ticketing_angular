import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  @ViewChild("statusChart") statusChartCanvas!: ElementRef;

  stats = { total: 0, open: 0, inProgress: 0, closed: 0, low: 0, medium: 0, high: 0 };

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.ticketService.getTickets({ limit: 100 }).subscribe({
      next: (res: any) => {
        const tickets = res.results;
        this.stats.total = res.total;
        this.stats.open = tickets.filter((ticket:any) => ticket.status === 'open').length;
        this.stats.inProgress = tickets.filter((ticket:any) => ticket.status === 'in progress').length;
        this.stats.closed = tickets.filter((ticket:any) => ticket.status === 'closed').length;
        this.stats.low = tickets.filter((ticket: any) => ticket.priority === 'low').length;
        this.stats.medium = tickets.filter((ticket: any) => ticket.priority === 'medium').length;
        this.stats.high = tickets.filter((ticket: any) => ticket.priority === 'high').length;
      
        this.createCharts();
      }
    });
  }

  createCharts() {
    new Chart(this.statusChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Abiertos', 'En Progreso', 'Cerrados'],
        datasets: [{
          data: [this.stats.open, this.stats.inProgress, this.stats.closed],
          backgroundColor: ['#FBBF24', '#3B82F6', '#10B981'],
          borderWidth: 0
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}


