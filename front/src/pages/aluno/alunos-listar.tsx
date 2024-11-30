import { useEffect, useState } from "react";
import { Aluno } from "../../models/Aluno";
import axios from "axios";

function AlunosListar() {
    const [aluno, setAluno] = useState<Aluno[]>([]);

    useEffect(() => {
        carregarAlunos();
    });

    function carregarAlunos() {
        axios.get<Aluno[]>("http://localhost:5139/alunos")
            .then((response) => {
                setAluno(response.data);
            })
            .catch((err) => {
                console.log("Erro:" + err);
            });
    }

    return (
        <div>
            <h1>Lista de Alunos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {aluno.map((aluno) => (
                        <tr>
                            <td>{aluno.matricula}</td>
                            <td>{aluno.nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AlunosListar;