import React, { useState, useEffect } from "react";
import axios from "axios";

function AtribuirNota() {
    const [materias, setMaterias] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [alunoId, setAlunoId] = useState("");
    const [materiaId, setMateriaId] = useState("");
    const [nota, setNota] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        carregarMaterias();
        carregarAlunos();
    }, []);

    function carregarMaterias() {
        axios.get("http://localhost:5139/materias")
            .then((response) => {
                setMaterias(response.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar matérias:", err);
            });
    }

    function carregarAlunos() {
        axios.get("http://localhost:5139/alunos")
            .then((response) => {
                setAlunos(response.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar alunos:", err);
            });
    }

    function atribuirNota(event: React.FormEvent) {
        event.preventDefault();

        if (!alunoId || !materiaId || !nota) {
            setMensagem("Preencha todos os campos!");
            return;
        }

        const notaValue = parseFloat(nota);
        if (notaValue < 0 || notaValue > 10) {
            setMensagem("A nota deve estar entre 0 e 10.");
            return;
        }

        axios.post(`http://localhost:5139/alunos/${alunoId}/materias/${materiaId}/nota`, notaValue, {
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                setMensagem(`Nota ${nota} atribuída com sucesso!`);
            })
            .catch((err) => {
                console.error("Erro ao atribuir nota:", err);
                setMensagem("Erro ao atribuir nota.");
            });
    }

    return (
        <div>
            <h1>Atribuir Nota</h1>
            <form onSubmit={atribuirNota}>
                <div>
                    <label>Selecione o Aluno</label>
                    <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)} required>
                        <option value="">Selecione</option>
                        {alunos.map((aluno: any) => (
                            <option key={aluno.matricula} value={aluno.matricula}>
                                {aluno.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Selecione a Matéria</label>
                    <select value={materiaId} onChange={(e) => setMateriaId(e.target.value)} required>
                        <option value="">Selecione</option>
                        {materias.map((materia: any) => (
                            <option key={materia.id} value={materia.id}>
                                {materia.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Nota</label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Atribuir Nota</button>
                {mensagem && <p>{mensagem}</p>}
            </form>
        </div>
    );
}

export default AtribuirNota;
