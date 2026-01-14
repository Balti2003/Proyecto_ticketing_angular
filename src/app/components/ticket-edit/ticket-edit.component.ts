import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/interfaces';

@Component({
  selector: 'app-ticket-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './ticket-edit.component.html',
})
export class TicketEditComponent implements OnInit {
  editForm: FormGroup;
  ticketId: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private authService: AuthService,
  private router: Router
  ) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    //obtenemos id de la url
    this.ticketId = this.route.snapshot.paramMap.get('id') || '';

    if (this.ticketId) {
      this.ticketService.getTicketById(this.ticketId).subscribe({
        next: (res) => {
          this.editForm.patchValue({
            title: res.ticket.title,
            description: res.ticket.description,
            priority: res.ticket.priority,
            status: res.ticket.status,
          });
        },
        error: (err) => this.errorMessage = err.error.message || 'Error loading ticket',
      });
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      const userId = this.authService.getUserId();

      if (!userId) {
        this.errorMessage = 'Sesión expirada. Por favor, vuelve a loguearte.';
        return;
      }

      const updatedData: Ticket = {
        ...this.editForm.value,
        user: userId
      };

      this.ticketService.updateTicket(this.ticketId, updatedData).subscribe({
        next: () => this.router.navigate(['/tickets']),
        error: (err) => {
          this.errorMessage = err.error.message || 'Error al actualizar';
        }
      });
    }
  }
}