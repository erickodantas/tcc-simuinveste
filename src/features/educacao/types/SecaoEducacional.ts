import { ConteudoEducacional } from "./ConteudoEducacional";

export interface SecaoEducacional {
  id: string;
  titulo: string;
  conteudos: ConteudoEducacional[];
}