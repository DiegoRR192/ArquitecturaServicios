import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './components/clientes/cliente-form.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CursosFormComponent } from './components/cursos/cursos-form/cursos-form.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { HomeComponent } from './components/home/home.component';
import { TutoresFormComponent } from './components/tutores/tutores-form/tutores-form.component';
import { TutoresComponent } from './components/tutores/tutores.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'tutores', component: TutoresComponent },
  { path: 'tutores/form', component: TutoresFormComponent },
  { path: 'tutores/form/:id', component: TutoresFormComponent },
  { path: 'empresas', component: ClientesComponent },
  { path: 'empresas/form', component: ClienteFormComponent },
  { path: 'empresas/form/:id', component: ClienteFormComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'cursos/form', component: CursosFormComponent },
  { path: 'cursos/form/:id', component: CursosFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
