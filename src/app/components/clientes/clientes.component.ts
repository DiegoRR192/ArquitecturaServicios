import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  lista: Clientes[] = [];
  faEdit = faPencil;
  faDelete = faTrash;
  titulo: string = 'Listado de clientes';
  totalRegistros = 0;
  totalPagina = 5;
  paginaActual = 0;
  pageSizeOption = [5, 10, 25, 50, 100];

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  private calcularRangos() {
    this.service.listarPagina(this.paginaActual.toString(), this.totalPagina.toString()).subscribe((p) => { this.lista = p.content as Clientes[]; this.totalRegistros = p.totalElements as number; console.log(this.lista) });
  }

  eliminar(cliente: Clientes): void {
    if (confirm(`Esta seguro de que desea eliminar a ${cliente.nombre}`)) {
      this.service.eliminar(cliente.id).subscribe(
        () => {
          this.calcularRangos();
          Swal.fire('Eliminar Cliente', `Fue ${cliente.nombre} eliminado  con éxito..`);
        },
        () => {
          Swal.fire('Eliminar Cliente', 'No se pudo eliminar al cliente, intente mas tarde...');
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
