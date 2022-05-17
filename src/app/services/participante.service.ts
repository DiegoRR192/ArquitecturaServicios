import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participante } from '../models/participante';

@Injectable({
  providedIn: 'root',
})
export class ParticipanteService {
  private urlEndPoint: string = 'http://localhost:8090/api/empresas';
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  listar(): Observable<Participante[]> {
    return this.http.get<Participante[]>(this.urlEndPoint);
  }

  crear(participante: Participante): Observable<Participante> {
    return this.http.post<Participante>(this.urlEndPoint, participante, {
      headers: this.httpHeaders,
    });
  }

  ver(id: number): Observable<Participante> {
    return this.http.get<Participante>(`${this.urlEndPoint}/${id}`);
  }

  modificar(participante: Participante): Observable<Participante> {
    return this.http.put<Participante>(
      `${this.urlEndPoint}/${participante.id}`,
      participante,
      {
        headers: this.httpHeaders,
      }
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  listarPagina(page: string, size: string): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.urlEndPoint}/pagina`, { params: params });
  }
}
