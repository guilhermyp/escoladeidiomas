import React, { useState, useEffect } from "react";
import axios from "axios";

interface Boletim {
  nomeAluno: string;
  materias: {
    materia: string;
    nota: string;
  }[];
}

function ConsultarBoletim() {
  const [alunos, setAlunos] = useState<{ matricula: number; nome: string }[]>([]);
  const [matriculaSelecionada, setMatriculaSelecionada] = useState<number | null>(null);
  const [boletim, setBoletim] = useState<Boletim | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarAlunos();
  }, []);

  function carregarAlunos() {
    axios
      .get("http://localhost:5139/alunos")
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar alunos:", err);
        setErro("Não foi possível carregar os alunos.");
      });
  }

  function consultarBoletim() {
    if (matriculaSelecionada === null) return;

    axios
      .get(`http://localhost:5139/alunos/${matriculaSelecionada}/boletim`)
      .then((response) => {
        setBoletim(response.data);
        setErro(null);
      })
      .catch((err) => {
        console.error("Erro ao consultar boletim:", err);
        setErro("Não foi possível consultar o boletim do aluno.");
        setBoletim(null);
      });
  }

  return (
    <div>
      <h1>Consultar Boletim do Aluno</h1>
      <div>
        <label>Selecione o Aluno:</label>
        <select
          value={matriculaSelecionada || ""}
          onChange={(e) => setMatriculaSelecionada(Number(e.target.value))}
        >
          <option value="">Selecione...</option>
          {alunos.map((aluno) => (
            <option key={aluno.matricula} value={aluno.matricula}>
              {aluno.nome}
            </option>
          ))}
        </select>
        <button onClick={consultarBoletim}>Consultar Boletim</button>
      </div>

      <h2>Boletim</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {boletim ? (
        <div>
          <p><strong>Aluno:</strong> {boletim.nomeAluno}</p>
          <table>
            <thead>
              <tr>
                <th>Matéria</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {boletim.materias.map((materia, index) => (
                <tr key={index}>
                  <td>{materia.materia}</td>
                  <td>{materia.nota || "Nota não atribuída"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !erro && <p>O aluno não está matriculado em nenhuma matéria.</p>
      )}
    </div>
  );
}

export default ConsultarBoletim;