import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AlunosListar from './pages/aluno/alunos-listar';
import AlunosCadastrar from './pages/aluno/alunos-cadastrar';
import AlunosEditar from './pages/aluno/alunos-editar';
import AlunosDeletar from './pages/aluno/alunos-deletar';
import VincularAluno from "./pages/materia/vincularaluno";
import AtribuirNota from "./pages/aluno/atribuirnota";
import Boletim from "./pages/aluno/boletim";
import ProfessoresCadastrar from './pages/professor/professores-cadastrar';
import ProfessoresListar from './pages/professor/professores-listar';
import ProfessoresEditar from './pages/professor/professores-editar';
import ProfessoresDeletar from './pages/professor/professores-deletar';
import VincularProfessor from './pages/materia/vincularprofessor';
import MateriasListar from './pages/materia/materias-listar';
import MateriasCadastrar from './pages/materia/materias-cadastrar';
import MateriasEditar from './pages/materia/materias-editar';
import MateriasDeletar from './pages/materia/materias-deletar';

function App() {
  return (
    <div id='App'>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/alunos"}>Listar Alunos</Link>
            </li>
            <li>
              <Link to={"/alunos/cadastar"}>Cadastrar Aluno</Link>
            </li>
            <li>
              <Link to={"/alunos/editar"}>Editar Aluno</Link>
            </li>
            <li>
              <Link to={"/alunos/deletar"}>Deletar Aluno</Link>
            </li>
            <li>
              <Link to="/materia/vincularaluno">Vincular Aluno</Link>
            </li>
            <li>
              <Link to="/alunos/atribuirnota">Atribuir Nota</Link>
            </li>
            <li>
              <Link to="/alunos/boletim">Consultar Boletim</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li>
              <Link to={"/professores"}>Listar Professores</Link>
            </li>
            <li>
              <Link to={"/professores/cadastar"}>Cadastrar Professor</Link>
            </li>
            <li>
              <Link to={"/professores/editar"}>Editar Professor</Link>
            </li>
            <li>
              <Link to={"/professores/deletar"}>Deletar Professor</Link>
            </li>
            <li>
              <Link to={"/materias/vincularprofessor"}>Vincular Professor à Matéria</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li>
              <Link to={"/materias"}>Listar Matérias</Link>
            </li>
            <li>
              <Link to={"/materias/cadastrar"}>Cadastrar Matéria</Link>
            </li>
            <li>
              <Link to={"/materias/editar"}>Editar Matéria</Link>
            </li>
            <li>
              <Link to={"/materias/deletar"}>Deletar Matéria</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/alunos" element={<AlunosListar />} />
          <Route path="/alunos/cadastar" element={<AlunosCadastrar />} />
          <Route path="/alunos/editar" element={<AlunosEditar />} />
          <Route path="/alunos/deletar" element={<AlunosDeletar />} />
          <Route path="/materia/vincularaluno" element={<VincularAluno />} />
          <Route path="/alunos/atribuirnota" element={<AtribuirNota />} />
          <Route path="/alunos/boletim" element={<Boletim />} />
          <Route path="/professores" element={<ProfessoresListar />} />
          <Route path="/professores/cadastar" element={<ProfessoresCadastrar />} />
          <Route path="/professores/editar" element={<ProfessoresEditar />} />
          <Route path="/professores/deletar" element={<ProfessoresDeletar />} />
          <Route path="/materias/vincularprofessor" element={<VincularProfessor />} />
          <Route path="/materias" element={<MateriasListar />} />
          <Route path="/materias/cadastrar" element={<MateriasCadastrar />} />
          <Route path="/materias/editar" element={<MateriasEditar />} />
          <Route path="/materias/deletar" element={<MateriasDeletar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
