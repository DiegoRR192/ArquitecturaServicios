import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  titulo: string = 'Formulario Cliente';
  cliente: Clientes = new Clientes();
  error: any;

  constructor(
    private service: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editar();
  }

  crear() {
    this.service.crear(this.cliente).subscribe(
      (cliente: { nombre: any; }) => {
        Swal.fire('Crear Cliente',`Cliente ${cliente.nombre} fue creado con éxito...`);
        this.router.navigate(['/clientes']);
      },
      (err: { status: number; error: any; }) => {
        if (err.status === 400) {
          this.error = err.error;
        }
      }
    );
  }

  editar(): void {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      let id = params['id'];
      if (id) {
        this.service.ver(id).subscribe((cliente: Clientes) => (this.cliente = cliente));
      }
    });
  }

  modificar() {
    this.service.modificar(this.cliente).subscribe(
      (cliente: { nombre: any; }) => {
        Swal.fire('Modificar Cliente',`Cliente ${cliente.nombre} fue modificado con éxito...`);
        this.router.navigate(['/clientes']);
      },
      (err: { status: number; error: any; }) => {
        if (err.status === 400) {
          this.error = err.error;
        }
      }
    );
  }
}
