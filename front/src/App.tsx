import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AlunosListar from './pages/aluno/alunos-listar';
import AlunosCadastrar from './pages/aluno/alunos-cadastrar';
import AlunosEditar from './pages/aluno/alunos-editar';
import AlunosDeletar from './pages/aluno/alunos-deletar';
import ProfessoresCadastrar from './pages/professor/professores-cadastrar';
import ProfessoresListar from './pages/professor/professores-listar';
import ProfessoresEditar from './pages/professor/professores-editar';
import ProfessoresDeletar from './pages/professor/professores-deletar';

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
          </ul>
        </nav>
        <Routes>
          <Route path="/alunos" element={<AlunosListar/>}></Route>

          <Route path='/alunos/cadastar' element={<AlunosCadastrar/>}></Route>
          <Route path='/alunos/editar' element={<AlunosEditar/>}></Route>
          <Route path='/alunos/deletar' element={<AlunosDeletar/>}></Route>
          
          <Route path="/professores" element={<ProfessoresListar/>}></Route>
          <Route path='/professores/cadastar' element={<ProfessoresCadastrar/>}></Route>
          <Route path='/professores/editar' element={<ProfessoresEditar/>}></Route>
          <Route path='/professores/deletar' element={<ProfessoresDeletar/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;