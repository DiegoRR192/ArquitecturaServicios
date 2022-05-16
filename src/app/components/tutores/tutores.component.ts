import { Component, OnInit } from '@angular/core';
import { Tutores } from 'src/app/models/tutores';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { TutoresService } from 'src/app/services/tutores.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.css']
})
export class TutoresComponent implements OnInit {

  titulo: string = 'Tutores';
  lista: Tutores[] = [];
  faEdit = faPencil;
  faDelete = faTrash;
  totalRegistros = 0;
  totalPagina = 5;
  paginaActual = 0;
  pageSizeOption = [5, 10, 25, 50, 100];

  constructor(private service: TutoresService) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  eliminar(tutores: Tutores): void {
    if (confirm(`Esta seguro de que desea eliminar a ${tutores.nombreTutor}`)) {
      this.service.eliminar(tutores.id).subscribe(
        () => {
          this.calcularRangos();
          Swal.fire('Eliminar Cliente', `Fue ${tutores.nombreTutor} eliminado  con éxito..`);
        },
        () => {
          Swal.fire('Eliminar Cliente', 'No se pudo eliminar al cliente, intente mas tarde...');
        }
      );
    }
  }

  private calcularRangos() {
    this.service.listarPagina(this.paginaActual.toString(), this.totalPagina.toString()).subscribe((p) => { this.lista = p.content as Tutores[]; this.totalRegistros = p.totalElements as number; console.log(this.lista) });
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPagina = event.pageSize;
    this.calcularRangos();
  }

}
