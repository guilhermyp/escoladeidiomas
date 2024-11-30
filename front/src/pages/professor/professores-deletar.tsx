import axios from "axios";
import { useState } from "react";

function ProfessoresDeletar() {
    const [professorId, setProfessorId] = useState("");

    function deletarProfessor(event : any) {
        event.preventDefault();

        axios.delete(`http://localhost:5139/professores/excluir/${professorId}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error("Erro", err)
            })
    }

    return (
        <div>
            <h1>Editar Professor</h1>
            <form onSubmit={deletarProfessor}>
                <div>
                    <label>Id do Professor</label>
                    <input
                        type="text"
                        value={professorId}
                        onChange={(e) => setProfessorId(e.target.value)}
                        required>               
                    </input>
                </div>
                <div>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default ProfessoresDeletar;