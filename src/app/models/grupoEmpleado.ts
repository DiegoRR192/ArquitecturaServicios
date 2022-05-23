import { Grupos } from './grupo';
import { Participante } from './participante';

export class GruposEmpleados {
  id!: number;
  asistencia: string = '';
  calificacion: number = 0;
  participante!: Participante;
  grupo!: Grupos;
}
