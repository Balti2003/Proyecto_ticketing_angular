import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:4000/api/comments';

  constructor(private http: HttpClient) { }

  // obtener comentarios de un ticket especifico
  getCommentsByTicket(ticketId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ticket/${ticketId}`);
  }

  // enviar un nuevo comentario
  addComment(ticketId: string, text: string): Observable<any> {
    const payload = { ticketId, text };
    return this.http.post<any>(this.apiUrl, payload);
  }
}
