import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupos } from '../models/grupo';

@Injectable({
    providedIn: 'root',
})

export class GrupoService {
    private urlEndPoint: string = 'http://localhost:8090/api/grupo';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    listar(): Observable<Grupos[]> {
        return this.http.get<Grupos[]>(this.urlEndPoint);
    }

    crear(grupo: Grupos): Observable<Grupos> {
        return this.http.post<Grupos>(this.urlEndPoint, grupo, {
            headers: this.httpHeaders,
        })
    }

    ver(id: number): Observable<Grupos> {
        return this.http.get<Grupos>(`${this.urlEndPoint}/${id}`);
    }

    modificar(grupo: Grupos): Observable<Grupos> {
        return this.http.put<Grupos>(
            `${this.urlEndPoint}/${grupo.id}`,
            grupo, {
            headers: this.httpHeaders,
        }
        )
    }

    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
    }

    listarPagina(page: string, size: string): Observable<any> {
        const params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<any>(`${this.urlEndPoint}/pagina`, { params: params });
    }

}