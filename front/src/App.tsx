import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import TarefaCadastrar from './components/pages/tarefa/TarefaCadastrar';
import TarefaLista from './components/pages/tarefa/TarefaLista';
import TarefaAlterar from './components/pages/tarefa/TarefaAlterar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pages/tarefa/listar">Listar Tarefas</Link>
          </li>
          <li>
            <Link to="/pages/tarefa/cadastrar">Cadastrar Tarefas</Link>
          </li>
          <li>
            <Link to="/pages/tarefa/concluidas">Tarefas Concluidas</Link>
          </li>
          <li>
            <Link to="/pages/tarefa/naoconcluidas">Tarefas Não Concluidas</Link>
          </li>
        </ul>
      </nav>

      <Routes>
      <Route path='/' element={<TarefaLista/>}/>
      <Route path='/pages/tarefa/listar' element={<TarefaLista/>}/>
      <Route path='/pages/tarefas/alterar/:id' element={<TarefaAlterar/>}/>
      <Route path='/pages/tarefa/cadastrar' element={<TarefaCadastrar/>}/></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
