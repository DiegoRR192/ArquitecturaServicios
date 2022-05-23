import { Component, OnInit } from '@angular/core';
import { Grupos } from 'src/app/models/grupo';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GrupoService } from 'src/app/services/grupo.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  titulo: string = "Listado Grupos";
  lista: Grupos[] = [];
  faEdit = faPencil;
  faDelete = faTrash;
  totalRegistros = 0;
  totalPagina = 5;
  paginaActual = 0;
  pageSizeOption = [5, 10, 25, 50, 100];

  constructor(private service: GrupoService) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  eliminar(grupo: Grupos): void {
    if (confirm(`Esta seguro de que desea eliminar a ${grupo.nombreGrupo}`)) {
      this.service.eliminar(grupo.id).subscribe(
        () => {
          this.calcularRangos();
          Swal.fire(
            'Eliminar Grupo',
            `Fue eliminado ${grupo.nombreGrupo} con éxito..`
          );
        },
        () => {
          Swal.fire(
            'Eliminar Grupo',
            'No se pudo eliminar al Grupo, intente mas tarde...'
          );
        }
      );
    }
  }

  private calcularRangos() {
    this.service
      .listarPagina(this.paginaActual.toString(), this.totalPagina.toString())
      .subscribe((p) => {
        this.lista = p.content as Grupos[];
        this.totalRegistros = p.totalElements as number;
      });
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPagina = event.pageSize;
    this.calcularRangos();
  }
}
