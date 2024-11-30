import axios from "axios";
import { useState } from "react";

function AlunosEditar() {
    const [matricula, setMatricula] = useState("");
    const [nome, setNome] = useState("");

    function editarAluno(event : any) {
        event.preventDefault();
        const alunoAtulizado = {
            matricula,
            nome,
        }
        axios.put(`http://localhost:5139/alunos/editar/${matricula}`, alunoAtulizado, {
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
            <h1>Editar aluno</h1>
            <form onSubmit={editarAluno}>
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

export default AlunosEditar;