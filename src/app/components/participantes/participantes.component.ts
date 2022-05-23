import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Participante } from 'src/app/models/participante';
import { ParticipanteService } from 'src/app/services/participante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css'],
})
export class ParticipantesComponent implements OnInit {
  titulo: string = 'Listado Empleados';
  lista: Participante[] = [];
  faEdit = faPencil;
  faDelete = faTrash;
  totalRegistros = 0;
  totalPagina = 5;
  paginaActual = 0;
  pageSizeOption = [5, 10, 25, 50, 100];

  constructor(private service: ParticipanteService) {}

  ngOnInit(): void {
    this.calcularRangos();
  }

  eliminar(participante: Participante): void {
    if (confirm(`Esta seguro de que desea eliminar a ${participante.nombre}`)) {
      this.service.eliminar(participante.id).subscribe(
        () => {
          this.calcularRangos();
          Swal.fire(
            'Eliminar Participante',
            `Fue ${participante.nombre} eliminado  con éxito..`
          );
        },
        () => {
          Swal.fire(
            'Eliminar Participante',
            'No se pudo eliminar al Participante, intente mas tarde...'
          );
        }
      );
    }
  }

  private calcularRangos() {
    this.service
      .listarPagina(this.paginaActual.toString(), this.totalPagina.toString())
      .subscribe((p) => {
        this.lista = p.content as Participante[];
        this.totalRegistros = p.totalElements as number;
      });
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPagina = event.pageSize;
    this.calcularRangos();
  }
}
