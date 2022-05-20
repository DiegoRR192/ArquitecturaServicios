import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TutoresComponent } from './components/tutores/tutores.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { TutoresFormComponent } from './components/tutores/tutores-form/tutores-form.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursosFormComponent } from './components/cursos/cursos-form/cursos-form.component';
import { EmpresasFormComponent } from './components/empresas/empresas-form/empresas-form.component';
import { ParticipantesComponent } from './components/participantes/participantes.component';
import { ParticipantesFormComponent } from './components/participantes/participantes-form/participantes-form.component';
import { MatSelectModule } from '@angular/material/select';
import { GruposComponent } from './components/grupos/grupos.component';
import { GruposFormComponent } from './components/grupos/grupos-form/grupos-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TutoresComponent,
    EmpresasComponent,
    TutoresFormComponent,
    CursosComponent,
    CursosFormComponent,
    EmpresasFormComponent,
    ParticipantesComponent,
    ParticipantesFormComponent,
    GruposComponent,
    GruposFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
