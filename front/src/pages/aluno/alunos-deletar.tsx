import axios from "axios";
import { useState } from "react";

function AlunosDeletar() {
    const [matricula, setMatricula] = useState("");

    function deletarAluno(event : any) {
        event.preventDefault();

        axios.delete(`http://localhost:5139/alunos/excluir/${matricula}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error("Erro", err)
            })
    }

    return (
        <div>
            <h1>Editar aluno</h1>
            <form onSubmit={deletarAluno}>
                <div>
                    <label>Matricula</label>
                    <input
                        type="text"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
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

export default AlunosDeletar;