import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AlunosListar from './pages/aluno/alunos-listar';
import AlunosCadastrar from './pages/aluno/alunos-cadastrar';
import AlunosEditar from './pages/aluno/alunos-editar';
import AlunosDeletar from './pages/aluno/alunos-deletar';

function App() {
  return (
    <div id='App'>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
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
        <Routes>
          <Route path="/" element={<AlunosListar/>}></Route>
          <Route path='/alunos/cadastar' element={<AlunosCadastrar/>}></Route>
          <Route path='/alunos/editar' element={<AlunosEditar/>}></Route>
          <Route path='/alunos/deletar' element={<AlunosDeletar/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;