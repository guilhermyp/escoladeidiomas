import axios from "axios";
import { useState } from "react";

function MateriasDeletar() {
    const [materiaId, setMateriaId] = useState(""); 

    function deletarMateria(event: React.FormEvent) {
        event.preventDefault(); 
        axios
            .delete(`http://localhost:5139/materias/${materiaId}`) 
            .then((response) => {
                console.log(response.data); 
                alert(`Matéria com ID ${materiaId} excluída com sucesso!`);
            })
            .catch((err) => {
                console.error("Erro ao excluir matéria:", err); 
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
                        value={materiaId} 
                        onChange={(e) => setMateriaId(e.target.value)} 
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
