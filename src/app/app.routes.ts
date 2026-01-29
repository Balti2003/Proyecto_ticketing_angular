import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { TicketEditComponent } from './components/ticket-edit/ticket-edit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'tickets', component: TicketListComponent, canActivate: [authGuard] },
    { path: 'tickets/new', component: TicketFormComponent, canActivate: [authGuard] },
    { path: 'tickets/detail/:id', component: TicketDetailComponent, canActivate: [authGuard] },
    { path: 'tickets/edit/:id', component: TicketEditComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard, adminGuard] },
    { path: '', redirectTo: '/tickets', pathMatch: 'full' },
];
