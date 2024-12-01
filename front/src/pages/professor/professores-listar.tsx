import { useEffect, useState } from "react";
import axios from "axios";
import { Professor } from "../../models/Professor";

function ProfessoresListar() {
    const [professores, setProfessores] = useState<Professor[]>([]);

    useEffect(() => {
        carregarProfessores();
    }, []);

    function carregarProfessores() {
        axios.get<Professor[]>("http://localhost:5139/professores")
            .then((response) => {
                setProfessores(response.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar professores:", err);
            });
    }

    return (
        <div>
            <h1>Lista de Professores</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id do Professor</th>
                        <th>Nome</th>
                        <th>Matéria Vinculada</th>
                    </tr>
                </thead>
                <tbody>
                    {professores.map((professor) => (
                        <tr key={professor.professorId}>
                            <td>{professor.professorId}</td>
                            <td>{professor.nome}</td>
                            <td>{professor.materia || "Nenhuma matéria vinculada"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProfessoresListar;
