import axios from "axios";
import { useState } from "react";

function ProfessoresCadastrar() {
    const [nome, setNome] = useState("");

    function cadastrarProfessor(event : any) {
        event.preventDefault();
        const professor = {
            nome: nome,
        };

        axios.post("http://localhost:5139/professores/cadastrar", professor, {
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
          <h1>Cadastrar professor</h1>
          <form onSubmit={cadastrarProfessor}>
            <div>
              <label htmlFor="nome">Nome do professor</label>
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

export default ProfessoresCadastrar;