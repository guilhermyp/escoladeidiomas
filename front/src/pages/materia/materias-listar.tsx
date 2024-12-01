import { useEffect, useState } from "react";
import axios from "axios";
import { Materia } from "../../models/Materia";

function MateriasListar() {
    const [materias, setMaterias] = useState<Materia[]>([]);

    useEffect(() => {
        carregarMaterias();
    }, []);

    function carregarMaterias() {
        axios.get("http://localhost:5139/materias")
            .then((response) => {
                setMaterias(response.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar matérias:", err);
            });
    }

    return (
        <div>
            <h1>Lista de Matérias</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Professor</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.map((materia) => (
                        <tr key={materia.id}>
                            <td>{materia.id}</td>
                            <td>{materia.nome}</td>
                            <td>{materia.professor || "Sem professor"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MateriasListar;