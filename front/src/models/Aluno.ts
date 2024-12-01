import { Materia } from "../models/Materia";

export interface Aluno {
    matricula: string;
    nome: string;
    materias?: Materia[];
}