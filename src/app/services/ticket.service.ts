import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Ticket } from "../models/interfaces";

@Injectable({ providedIn: "root" })
export class TicketService {
    private API_URL = "http://localhost:4000/api/tickets";

    constructor(private http: HttpClient) {}

    //GET /api/tickets/
    getTickets() {
        return this.http.get<any>(this.API_URL);
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