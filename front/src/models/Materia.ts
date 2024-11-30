import { Aluno } from "./Aluno";
import { Professor } from "./Professor";

export interface Materia {
    materiaId?: string;
    nome: string;
    professor?: Professor;
    alunos?: Aluno[];
}