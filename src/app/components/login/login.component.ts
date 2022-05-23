import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  correo: string = '';
  pass: string = '';
  auth: boolean = false;
  lista = [
    { correo: 'admin@gmail.com', pass: '123' },
    { correo: 'tutor@gmail.com', pass: '123' },
    { correo: 'empleado@gmail.com', pass: '123' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (
      this.correo == this.lista[0].correo ||
      this.correo == this.lista[1].correo ||
      this.correo == this.lista[2].correo
    ) {
      if (
        this.pass == this.lista[0].pass ||
        this.pass == this.lista[1].pass ||
        this.pass == this.lista[2].pass
      ) {
        Swal.fire(
          'Acceso concedido',
          `Bienvenido ${this.correo}, has ingresado correctamente!`
        );
        this.router.navigate(['/home']);
      } else {
        Swal.fire('Acceso denegado', 'La contraseña es incorrecta...');
      }
    } else {
      Swal.fire('Acceso denegado', 'El correo es incorrecto...');
    }
  }
}
