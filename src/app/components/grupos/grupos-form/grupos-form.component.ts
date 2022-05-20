import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos } from 'src/app/models/cursos';
import { Empresa } from 'src/app/models/empresa';
import { Grupos } from 'src/app/models/grupo';
import { Tutores } from 'src/app/models/tutores';
import { CursoService } from 'src/app/services/cursos.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { TutoresService } from 'src/app/services/tutores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupos-form',
  templateUrl: './grupos-form.component.html',
  styleUrls: ['./grupos-form.component.css']
})
export class GruposFormComponent implements OnInit {

  grupos: Grupos=new Grupos();
  tutores: Tutores[]=[];
  empresas: Empresa[]=[];
  cursos: Cursos[]=[];
  tutor: Tutores=new Tutores();
  empresa: Empresa=new Empresa();
  curso: Cursos=new Cursos();
  error: any;
  titulo: string="Formulario Grupos";

  constructor(
    private service: GrupoService,
    private serviceTutores: TutoresService,
    private serviceEmpresa: EmpresaService,
    private serviceCurso: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editar();
    this.consultarEmpresas();
    this.consultarTutores();
    this.consultarCursos();
  }

  crear() {
    this.grupos.tutor=this.tutor;
    this.grupos.empresa=this.empresa;
    this.grupos.curso=this.curso;
    
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
          .subscribe(
            (grupos: Grupos) =>
              (this.grupos = grupos)
          );
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



  modificar() {
    this.grupos.tutor=this.tutor
    this.grupos.empresa=this.empresa
    this.grupos.curso=this.curso

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
}
