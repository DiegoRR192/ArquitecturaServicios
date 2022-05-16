import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutores } from 'src/app/models/tutores';
import { TutoresService } from 'src/app/services/tutores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutores-form',
  templateUrl: './tutores-form.component.html',
  styleUrls: ['./tutores-form.component.css'],
})
export class TutoresFormComponent implements OnInit {
  titulo: string = 'Formulario Tutores';
  tutores: Tutores = new Tutores();
  error: any;

  constructor(
    private service: TutoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  crear() {
    this.service.crear(this.tutores).subscribe(
      (tutores: { nombreTutor: any; }) => {
        Swal.fire('Crear Cliente',`Cliente ${tutores.nombreTutor} fue creado con éxito...`);
        this.router.navigate(['/tutores']);
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
        this.service.ver(id).subscribe((tutores: Tutores) => (this.tutores = tutores));
      }
    });
  }

  modificar() {
    this.service.modificar(this.tutores).subscribe(
      (tutores: { nombreTutor: any; }) => {
        Swal.fire('Modificar Cliente',`Cliente ${tutores.nombreTutor} fue modificado con éxito...`);
        this.router.navigate(['/tutores']);
      },
      (err: { status: number; error: any; }) => {
        if (err.status === 400) {
          this.error = err.error;
        }
      }
    );
  }
}
