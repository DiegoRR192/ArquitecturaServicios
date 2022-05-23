import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosFormComponent } from './components/cursos/cursos-form/cursos-form.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { EmpresasFormComponent } from './components/empresas/empresas-form/empresas-form.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ParticipantesFormComponent } from './components/participantes/participantes-form/participantes-form.component';
import { ParticipantesComponent } from './components/participantes/participantes.component';
import { TutoresFormComponent } from './components/tutores/tutores-form/tutores-form.component';
import { TutoresComponent } from './components/tutores/tutores.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tutores', component: TutoresComponent },
  { path: 'tutores/form', component: TutoresFormComponent },
  { path: 'tutores/form/:id', component: TutoresFormComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'empresas/form', component: EmpresasFormComponent },
  { path: 'empresas/form/:id', component: EmpresasFormComponent },
  { path: 'empleados', component: ParticipantesComponent },
  { path: 'empleados/form', component: ParticipantesFormComponent },
  { path: 'empleados/form/:id', component: ParticipantesFormComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'cursos/form', component: CursosFormComponent },
  { path: 'cursos/form/:id', component: CursosFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
