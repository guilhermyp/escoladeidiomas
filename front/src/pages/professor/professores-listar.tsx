import { useEffect, useState } from "react";
import axios from "axios";
import { Professor } from "../../models/Professor";

function ProfessoresListar() {
    const [professor, setProfessor] = useState<Professor[]>([]);

    useEffect(() => {
        carregarProfessores();
    }, []);

    function carregarProfessores() {
        axios.get<Professor[]>("http://localhost:5139/professores")
            .then((response) => {
                setProfessor(response.data);
            })
            .catch((err) => {
                console.log("Erro:" + err);
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
                    </tr>
                </thead>
                <tbody>
                    {professor.map((professor) => (
                        <tr>
                            <td>{professor.professorId}</td>
                            <td>{professor.nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProfessoresListar;