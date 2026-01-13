import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ticket-form.component.html',
})
export class TicketFormComponent {
  ticketForm: FormGroup;
  successMessage: string  = '';
  errorMessage: string  = '';

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
      priority: ['low', [Validators.required]],
      status: ['open', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      this.ticketService.createTicket(this.ticketForm.value).subscribe({
        next: () => {
          this.successMessage = 'Ticket created successfully';
          setTimeout(() => this.router.navigate(['/tickets']), 2000);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Failed to create ticket';
        }
      });
    }
  }
}
