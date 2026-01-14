import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
      priority: ['low', [Validators.required]],
      status: ['open', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const ticketData = {
        ...this.ticketForm.value,
        user: this.authService.getUserId()
      };

      this.ticketService.createTicket(ticketData).subscribe({
        next: () => this.router.navigate(['/tickets']),
        error: (err) => {
          this.errorMessage = err.error.message;
          console.error("Error 400", err.error);
        }
      });
    }
  }
}
