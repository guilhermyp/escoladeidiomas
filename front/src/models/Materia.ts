import { Aluno } from "./Aluno";
import { Professor } from "./Professor";

export interface Materia {
    id?: string;
    nome: string;
    professorId?: number;
    professor?: String;
    alunos?: Aluno[];
}


