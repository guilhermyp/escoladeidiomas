import { Aluno } from "./Aluno";
import { Materia } from "./Materia";

export interface Nota {
    aluno: Aluno;
    materia: Materia;
    valor: number;
}