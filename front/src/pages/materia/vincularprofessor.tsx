import { useState } from "react";
import axios from "axios";

const VincularProfessor = () => {
    const [materiaId, setMateriaId] = useState("");
    const [professorId, setProfessorId] = useState("");

    const vincularProfessor = (event: React.FormEvent) => {
        event.preventDefault();

        axios.put(`http://localhost:5139/materias/${materiaId}/vincular-professor/${professorId}`)
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                console.error("Erro ao vincular professor:", error);
                alert("Erro ao vincular professor.");
            });
    };

    return (
        <div>
            <h1>Vincular Professor à Matéria</h1>
            <form onSubmit={vincularProfessor}>
                <div>
                    <label>ID da Matéria</label>
                    <input
                        type="number"
                        value={materiaId}
                        onChange={(e) => setMateriaId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>ID do Professor</label>
                    <input
                        type="number"
                        value={professorId}
                        onChange={(e) => setProfessorId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Vincular</button>
            </form>
        </div>
    );
};

export default VincularProfessor;