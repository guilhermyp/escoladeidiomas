import axios from "axios";
import { useState } from "react";

function MateriasDeletar() {
    const [materiaId, setMateriaId] = useState(""); // Estado para armazenar o ID da matéria

    function deletarMateria(event: React.FormEvent) {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        axios
            .delete(`http://localhost:5139/materias/${materiaId}`) // Endpoint para excluir matéria
            .then((response) => {
                console.log(response.data); // Exibe a resposta no console
                alert(`Matéria com ID ${materiaId} excluída com sucesso!`);
            })
            .catch((err) => {
                console.error("Erro ao excluir matéria:", err); // Exibe o erro no console
            });
    }

    return (
        <div>
            <h1>Excluir Matéria</h1>
            <form onSubmit={deletarMateria}>
                <div>
                    <label>Id da Matéria</label>
                    <input
                        type="text"
                        value={materiaId} // Liga o valor ao estado
                        onChange={(e) => setMateriaId(e.target.value)} // Atualiza o estado
                        required
                    />
                </div>
                <div>
                    <button type="submit">Excluir</button>
                </div>
            </form>
        </div>
    );
}

export default MateriasDeletar;
