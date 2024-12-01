import React, { useState } from "react";
import axios from "axios";

function MateriasCadastrar() {
    const [nome, setNome] = useState("");

    function cadastrarMateria(event: React.FormEvent) {
        event.preventDefault();
        const novaMateria = { nome };

        axios.post("http://localhost:5139/materias/cadastrar", novaMateria, {
            headers: { "Content-Type": "application/json" },
        })
        .then(() => {
            alert("Matéria cadastrada com sucesso!");
            setNome("");
        })
        .catch((error) => {
            console.error("Erro ao cadastrar matéria:", error);
        });
    }

    return (
        <div>
            <h1>Cadastrar Matéria</h1>
            <form onSubmit={cadastrarMateria}>
                <div>
                    <label>Nome da Matéria</label>
                    <input
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

export default MateriasCadastrar;
