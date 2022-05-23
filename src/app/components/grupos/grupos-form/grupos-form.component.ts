import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos } from 'src/app/models/cursos';
import { Empresa } from 'src/app/models/empresa';
import { Grupos } from 'src/app/models/grupo';
import { GruposEmpleados } from 'src/app/models/grupoEmpleado';
import { Participante } from 'src/app/models/participante';
import { Tutores } from 'src/app/models/tutores';
import { CursoService } from 'src/app/services/cursos.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { TutoresService } from 'src/app/services/tutores.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupos-form',
  templateUrl: './grupos-form.component.html',
  styleUrls: ['./grupos-form.component.css'],
})
export class GruposFormComponent implements OnInit {
  grupos: Grupos = new Grupos();
  faDelete = faTrash;
  tutores: Tutores[] = [];
  empresas: Empresa[] = [];
  cursos: Cursos[] = [];
  participantes: Participante[] = [];
  participante: Participante = new Participante();
  lista: GruposEmpleados[] = [];
  tutor: Tutores = new Tutores();
  empresa: Empresa = new Empresa();
  curso: Cursos = new Cursos();
  error: any;
  titulo: string = 'Formulario Grupos';

  constructor(
    private service: GrupoService,
    private serviceTutores: TutoresService,
    private serviceEmpresa: EmpresaService,
    private serviceCurso: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editar();
    this.consultarEmpresas();
    this.consultarTutores();
    this.consultarCursos();
    this.ver();
  }

  crear() {
    this.grupos.tutor = this.tutor;
    this.grupos.empresa = this.empresa;
    this.grupos.curso = this.curso;

    this.service.crear(this.grupos).subscribe(
      (grupos: { nombreGrupo: any }) => {
        Swal.fire(
          'Crear Grupos',
          `Grupo ${grupos.nombreGrupo} fue creado con éxito...`
        );
        this.router.navigate(['/grupos']);
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
          .subscribe((grupos: Grupos) => (this.grupos = grupos));
      }
    });
  }

  consultarTutores() {
    this.serviceTutores.listar().subscribe((data) => (this.tutores = data));
  }

  consultarEmpresas() {
    this.serviceEmpresa.listar().subscribe((data) => (this.empresas = data));
  }

  consultarCursos() {
    this.serviceCurso.listar().subscribe((data) => (this.cursos = data));
  }

  ver() {
    if (this.empresa.id) {
      this.serviceEmpresa
        .ver(this.empresa.id)
        .subscribe((data) => console.log(data));
    }
  }

  modificar() {
    this.grupos.tutor = this.tutor;
    this.grupos.empresa = this.empresa;
    this.grupos.curso = this.curso;

    this.service.modificar(this.grupos).subscribe(
      (grupos: { nombreGrupo: any }) => {
        Swal.fire(
          'Modificar Grupo',
          `Grupo ${grupos.nombreGrupo} fue modificado con éxito...`
        );
        this.router.navigate(['/grupos']);
      },
      (err: { status: number; error: any }) => {
        if (err.status === 400) {
          this.error = err.error;
        }
      }
    );
  }

  agregarEmpleado() {
    const temp = new GruposEmpleados();
    this.lista.push(temp);
  }

  eliminarEmpleado(id: number) {
    this.lista = this.lista.filter((item, index) => index != id);
  }
}
