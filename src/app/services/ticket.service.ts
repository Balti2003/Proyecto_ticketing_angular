import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Ticket } from "../models/interfaces";

@Injectable({ providedIn: "root" })
export class TicketService {
    private API_URL = "http://localhost:4000/api/tickets";

    constructor(private http: HttpClient) {}

    //GET /api/tickets/
    getTickets(filters?: any) {
        let params = new HttpParams();

        if (filters) {
            if (filters.search) params = params.set("search", filters.search);
            if (filters.status) params = params.set("status", filters.status);
            if (filters.priority) params = params.set("priority", filters.priority);
            if (filters.page) params = params.set("page", filters.page.toString());

            if (filters.user) params = params.set("user", filters.user);
        }

        return this.http.get<any>(this.API_URL, { params });
    }

    //GET /api/tickets/:id
    getTicketById(id: string) {
        return this.http.get<{ticket: Ticket}>(`${this.API_URL}/${id}`);
    }

    //POST /api/tickets/
    createTicket(ticket: Ticket) {
        return this.http.post<{ticket: Ticket}>(this.API_URL, ticket);
    }

    //PUT /api/tickets/:id
    updateTicket(id: string, ticket: Ticket) {
        return this.http.put<{ticket: Ticket}>(`${this.API_URL}/${id}`, ticket);
    }

    //DELETE /api/tickets/:id
    deleteTicket(id: string) {
        return this.http.delete(`${this.API_URL}/${id}`);
    }
}