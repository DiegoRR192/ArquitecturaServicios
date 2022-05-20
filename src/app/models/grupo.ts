import { Cursos } from "./cursos";
import { Empresa } from "./empresa";
import { Tutores } from "./tutores";

export class Grupos {
    id!: number;
    nombreGrupo!: string;
    estado!: string;
    fechaInicio!: string;
    fechaFin!: string;
    tutor!: Tutores;
    empresa!: Empresa;
    curso!: Cursos;
  }
  