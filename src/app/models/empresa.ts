import { Participante } from './participante';

export class Empresa {
  id!: number;
  codigoEmpresa!: string;
  nombreEmpresa!: string;
  telefonoEmpresa!: number;
  dirEmpresa!: string;
  correoEmpresa!: string;
  participantes!: Participante[];
  nombreTutor: any;
}
