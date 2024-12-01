import axios from "axios";
import { useState } from "react";

function MateriasEditar() {
    const [materiaId, setMateriaId] = useState(""); 
    const [nome, setNome] = useState(""); 

    function editarMateria(event: React.FormEvent) {
        event.preventDefault(); 

        const materiaAtualizada = { nome };
        axios
            .put(`http://localhost:5139/materias/editar/${materiaId}`, materiaAtualizada, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                console.log(response.data); 
                alert(`Matéria com ID ${materiaId} editada com sucesso!`);
            })
            .catch((err) => {
                console.error("Erro ao editar matéria:", err);
            });
    }

    return (
        <div>
            <h1>Editar Matéria</h1>
            <form onSubmit={editarMateria}>
                <div>
                    <label htmlFor="materiaId">Id da Matéria</label>
                    <input
                        id="materiaId"
                        type="text"
                        value={materiaId} // Liga o valor ao estado
                        onChange={(e) => setMateriaId(e.target.value)} // Atualiza o estado
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nome">Nome da Matéria</label>
                    <input
                        id="nome"
                        type="text"
                        value={nome} // Liga o valor ao estado
                        onChange={(e) => setNome(e.target.value)} // Atualiza o estado
                        required
                    />
                </div>
                <div>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}

export default MateriasEditar;
