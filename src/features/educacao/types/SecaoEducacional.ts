import { ConteudoEducacional } from "./ConteudoEducacional";

export interface SecaoEducacional {
  id: string;
  titulo: string;
  nivel: number;
  conteudos: ConteudoEducacional[];
}