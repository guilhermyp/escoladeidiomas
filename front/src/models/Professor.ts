import { Aluno } from "./Aluno";
import { Materia } from "../models/Materia";

export interface Professor {
    professorId: string;
    nome: string;
    materia?: string;
}