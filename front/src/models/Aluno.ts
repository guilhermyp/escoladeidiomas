import { Materia } from "../models/Materia";
import { Professor } from "./Professor";

export interface Aluno {
    matricula: string;
    nome: string;
    materias?: Materia[];
}