import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cursos } from '../models/cursos';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private urlEndPoint: string = 'http://localhost:8090/api/cursos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  listar(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.urlEndPoint);
  }

  crear(curso: Cursos): Observable<Cursos> {
    return this.http.post<Cursos>(this.urlEndPoint, curso, {
      headers: this.httpHeaders,
    });
  }

  ver(id: number): Observable<Cursos> {
    return this.http.get<Cursos>(`${this.urlEndPoint}/${id}`);
  }

  modificar(curso: Cursos): Observable<Cursos> {
    return this.http.put<Cursos>(
      `${this.urlEndPoint}/${curso.id}`,
      curso,
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
