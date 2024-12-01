import React, { useState, useEffect } from "react";
import axios from "axios";
import { Materia } from "../../models/Materia";
import { Aluno } from "../../models/Aluno";

function VincularAluno() {
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [materiaId, setMateriaId] = useState<string>("");
    const [alunoId, setAlunoId] = useState<string>("");
    const [mensagem, setMensagem] = useState<string>("");

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

    function vincularAluno(event: React.FormEvent) {
        event.preventDefault();

        if (!alunoId || !materiaId) {
            setMensagem("Selecione um aluno e uma matéria!");
            return;
        }

        axios.post(`http://localhost:5139/alunos/${alunoId}/inscrever/${materiaId}`)
            .then(() => {
                setMensagem("Aluno vinculado à matéria com sucesso!");
            })
            .catch((err) => {
                console.error("Erro ao vincular aluno:", err);
                setMensagem("Erro ao vincular aluno à matéria.");
            });
    }

    return (
        <div>
            <h1>Vincular Aluno à Matéria</h1>
            <form onSubmit={vincularAluno}>
                <div>
                    <label>Selecione o Aluno</label>
                    <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)} required>
                        <option value="">Selecione</option>
                        {alunos.map((aluno) => (
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
                        {materias.map((materia) => (
                            <option key={materia.id} value={materia.id}>
                                {materia.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit">Vincular</button>
                </div>
                {mensagem && <p>{mensagem}</p>}
            </form>
        </div>
    );
}

export default VincularAluno;
