import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  listar(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.urlEndPoint);
  }

  crear(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.urlEndPoint, cliente, {
      headers: this.httpHeaders,
    });
  }

  ver(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.urlEndPoint}/${id}`);
  }

  modificar(cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(
      `${this.urlEndPoint}/${cliente.id}`,
      cliente,
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
