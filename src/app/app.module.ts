import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { ClienteFormComponent } from './components/clientes/cliente-form.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TutoresComponent } from './components/tutores/tutores.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { TutoresFormComponent } from './components/tutores/tutores-form/tutores-form.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursosFormComponent } from './components/cursos/cursos-form/cursos-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HomeComponent,
    ProductosComponent,
    ClienteFormComponent,
    TutoresComponent,
    EmpresasComponent,
    TutoresFormComponent,
    CursosComponent,
    CursosFormComponent
  ],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, HttpClientModule, FormsModule, FontAwesomeModule, BrowserAnimationsModule, MatPaginatorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
