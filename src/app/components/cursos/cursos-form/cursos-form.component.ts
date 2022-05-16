import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos } from 'src/app/models/cursos';
import { CursoService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css'],
})
export class CursosFormComponent implements OnInit {
  titulo: string = 'Formulario Curso';
  curso: Cursos = new Cursos();
  error: any;

  constructor(
    private service: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editar();
  }

  crear() {
    this.service.crear(this.curso).subscribe(
      (curso: { nombre: any }) => {
        Swal.fire(
          'Crear Curo',
          `Curso ${curso.nombre} fue creado con éxito...`
        );
        this.router.navigate(['/cursos']);
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
          .subscribe((curso: Cursos) => (this.curso = curso));
      }
    });
  }

  modificar() {
    this.service.modificar(this.curso).subscribe(
      (curso: { nombre: any }) => {
        Swal.fire(
          'Modificar Curso',
          `Curso ${curso.nombre} fue modificado con éxito...`
        );
        this.router.navigate(['/cursos']);
      },
      (err: { status: number; error: any }) => {
        if (err.status === 400) {
          this.error = err.error;
        }
      }
    );
  }
}
