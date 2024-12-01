import React, { useEffect, useState } from "react";
import axios from "axios";
import { Aluno } from "../../models/Aluno";

function AlunosListar() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);

    useEffect(() => {
        carregarAlunos();
    }, []);

    function carregarAlunos() {
        axios
            .get("http://localhost:5139/alunos")
            .then((response) => {
                setAlunos(response.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar alunos:", err);
            });
    }

    return (
        <div>
            <h1>Lista de Alunos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Matrícula</th>
                        <th>Nome</th>
                        <th>Matérias</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((aluno) => (
                        <tr key={aluno.matricula}>
                            <td>{aluno.matricula}</td>
                            <td>{aluno.nome}</td>
                            <td>
                                {aluno.materias && aluno.materias.length > 0 ? (
                                    <ul>
                                        {aluno.materias.map((materia) => (
                                            <li key={materia.id}>{materia.nome}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    "Nenhuma matéria vinculada"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AlunosListar;