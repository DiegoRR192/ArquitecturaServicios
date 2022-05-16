import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './components/clientes/cliente-form.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
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
  { path: 'cursos', component: ProductosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
