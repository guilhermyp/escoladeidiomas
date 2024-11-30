import axios from "axios";
import { useState } from "react";

function AlunosCadastrar() {
    const [nome, setNome] = useState("");

    function cadastrarAluno(event : any) {
        event.preventDefault();
        const aluno = {
            nome: nome,
        };

        axios.post("http://localhost:5139/alunos/cadastrar", aluno, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.error("Erro", err)
        });
    }

    return (
        <div>
          <h1>Cadastrar Aluno</h1>
          <form onSubmit={cadastrarAluno}>
            <div>
              <label htmlFor="nome">Nome do aluno</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      );
}

export default AlunosCadastrar;