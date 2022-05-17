import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  titulo: string = 'Listado Empresas';
  lista: Empresa[] = [];
  faEdit = faPencil;
  faDelete = faTrash;
  totalRegistros = 0;
  totalPagina = 5;
  paginaActual = 0;
  pageSizeOption = [5, 10, 25, 50, 100];

  constructor(private service: EmpresaService) {}

  ngOnInit(): void {
    this.calcularRangos();
  }

  eliminar(empresa: Empresa): void {
    if (
      confirm(`Esta seguro de que desea eliminar a ${empresa.nombreEmpresa}`)
    ) {
      this.service.eliminar(empresa.id).subscribe(
        () => {
          this.calcularRangos();
          Swal.fire(
            'Eliminar Empresa',
            `Fue ${empresa.nombreEmpresa} eliminado  con éxito..`
          );
        },
        () => {
          Swal.fire(
            'Eliminar Empresa',
            'No se pudo eliminar al empresa, intente mas tarde...'
          );
        }
      );
    }
  }

  private calcularRangos() {
    this.service
      .listarPagina(this.paginaActual.toString(), this.totalPagina.toString())
      .subscribe((p) => {
        this.lista = p.content as Empresa[];
        this.totalRegistros = p.totalElements as number;
        console.log(this.lista);
      });
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPagina = event.pageSize;
    this.calcularRangos();
  }
}
