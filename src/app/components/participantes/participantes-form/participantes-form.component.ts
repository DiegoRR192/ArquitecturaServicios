import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { Participante } from 'src/app/models/participante';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ParticipanteService } from 'src/app/services/participante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-participantes-form',
  templateUrl: './participantes-form.component.html',
  styleUrls: ['./participantes-form.component.css'],
})
export class ParticipantesFormComponent implements OnInit {
  titulo: string = 'Formulario Participantes';
  participantes: Participante = new Participante();
  error: any;
  empresas: Empresa[] = [];
  empresa: Empresa = new Empresa();

  constructor(
    private service: ParticipanteService,
    private serviceEmpresa: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editar();
    this.consultarEmpresas();
  }

  crear() {
    this.participantes.empresa = this.empresa;
    this.service.crear(this.participantes).subscribe(
      (tutores: { nombre: any }) => {
        Swal.fire(
          'Crear Participantes',
          `Participantes ${tutores.nombre} fue creado con éxito...`
        );
        this.router.navigate(['/participantes']);
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
          .subscribe(
            (participantes: Participante) =>
              (this.participantes = participantes)
          );
      }
    });
  }

  consultarEmpresas() {
    this.serviceEmpresa.listar().subscribe((data) => (this.empresas = data));
  }

  modificar() {
    this.service.modificar(this.participantes).subscribe(
      (participantes: { nombre: any }) => {
        Swal.fire(
          'Modificar Participante',
          `Participante ${participantes.nombre} fue modificado con éxito...`
        );
        this.router.navigate(['/participantes']);
      },
      (err: { status: number; error: any }) => {
        if (err.status === 400) {
          this.error = err.error;
        }
      }
    );
  }
}
