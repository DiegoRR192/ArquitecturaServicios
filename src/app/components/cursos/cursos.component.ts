import { Component, OnInit } from '@angular/core';
import { Cursos } from 'src/app/models/cursos';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { TutoresService } from 'src/app/services/tutores.service';
import { PageEvent } from '@angular/material/paginator';
import { CursoService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  titulo: string = 'Listado Cursos';
  lista: Cursos[] = [];
  faEdit = faPencil;
  faDelete = faTrash;
  totalRegistros = 0;
  totalPagina = 5;
  paginaActual = 0;
  pageSizeOption = [5, 10, 25, 50, 100];

  constructor(private service: CursoService) {}

  ngOnInit(): void {
    this.calcularRangos();
  }

  private calcularRangos() {
    this.service
      .listarPagina(this.paginaActual.toString(), this.totalPagina.toString())
      .subscribe((p) => {
        this.lista = p.content as Cursos[];
        this.totalRegistros = p.totalElements as number;
        console.log(this.lista);
      });
//    this.service.listar().subscribe((data) => (this.lista = data));
  }

  eliminar(curso: Cursos): void {
    if (confirm(`Esta seguro de que desea eliminar a ${curso.nombre}`)) {
      this.service.eliminar(curso.id).subscribe(
        () => {
          this.calcularRangos();
          Swal.fire(
            'Eliminar Curso',
            `Fue ${curso.nombre} eliminado  con éxito..`
          );
        },
        () => {
          Swal.fire(
            'Eliminar Curso',
            'No se pudo eliminar al curso, intente mas tarde...'
          );
        }
      );
    }
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPagina = event.pageSize;
    this.calcularRangos();
  }
}
