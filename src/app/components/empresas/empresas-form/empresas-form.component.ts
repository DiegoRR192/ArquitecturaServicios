import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.css'],
})
export class EmpresasFormComponent implements OnInit {
  titulo: string = 'Formulario Empresas';
  empresas: Empresa = new Empresa();
  error: any;
  totalParticipantes: number = 0

  constructor(
    private service: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editar();
    this.empresas.participantes ? this.totalParticipantes = this.empresas.participantes.length : 0
  }

  crear() {
    this.service.crear(this.empresas).subscribe(
      (empresa: { nombreEmpresa: any }) => {
        Swal.fire(
          'Crear Empresa',
          `Empresa ${empresa.nombreEmpresa} fue creado con éxito...`
        );
        this.router.navigate(['/empresas']);
      },
      (err: { status: number; error: any }) => {
        if (err.status === 400) {
          this.error = err.error;
        }
      }
    );
  }

  editar(): void {
    this.route.params.subscribe((params: { [x: string]: any }) => {
      let id = params['id'];
      if (id) {
        this.service
          .ver(id)
          .subscribe((empresas: Empresa) => (this.empresas = empresas));
      }
    });
  }

  modificar() {
    this.service.modificar(this.empresas).subscribe(
      (empresas: { nombreEmpresa: any }) => {
        Swal.fire(
          'Modificar Empresa',
          `Empresa ${empresas.nombreEmpresa} fue modificado con éxito...`
        );
        this.router.navigate(['/empresas']);
      },
      (err: { status: number; error: any }) => {
        if (err.status === 400) {
          this.error = err.error;
        }
      }
    );
  }
}
