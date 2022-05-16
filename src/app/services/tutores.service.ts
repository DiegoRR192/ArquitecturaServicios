import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutores } from '../models/tutores';

@Injectable({
  providedIn: 'root',
})
export class TutoresService {
  private urlEndPoint: string = 'http://localhost:8090/api/tutores';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  listar(): Observable<Tutores[]> {
    return this.http.get<Tutores[]>(this.urlEndPoint);
  }

  crear(tutores: Tutores): Observable<Tutores> {
    return this.http.post<Tutores>(this.urlEndPoint, tutores, {
      headers: this.httpHeaders,
    });
  }

  ver(id: number): Observable<Tutores> {
    return this.http.get<Tutores>(`${this.urlEndPoint}/${id}`);
  }

  modificar(tutores: Tutores): Observable<Tutores> {
    return this.http.put<Tutores>(
      `${this.urlEndPoint}/${tutores.id}`,
      tutores,
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
    return this.http.get<any>(this.urlEndPoint, { params: params });
  }
}
