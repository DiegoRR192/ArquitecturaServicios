import { Empresa } from './empresa';

export class Participante {
  id!: number;
  nombre!: string;
  codigoParticipante!: string;
  telefono!: number;
  estado!: boolean;
  empresa!: Empresa;
}
