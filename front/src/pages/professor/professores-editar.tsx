import axios from "axios";
import { useState } from "react";

function ProfessoresEditar() {
    const [professorId, setprofessorId] = useState("");
    const [nome, setNome] = useState("");

    function editarProfessor(event : any) {
        event.preventDefault();
        const professorAtulizado = {
            professorId,
            nome,
        }
        axios.put(`http://localhost:5139/professores/editar/${professorId}`, professorAtulizado, {
            headers: {
                'Content-Type' : 'application/json',
            },
        })
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
            <form onSubmit={editarProfessor}>
                <div>
                    <label>Id do Professor</label>
                    <input
                        type="text"
                        value={professorId}
                        onChange={(e) => setprofessorId(e.target.value)}
                        required>               
                    </input>
                </div>
                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
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

export default ProfessoresEditar;