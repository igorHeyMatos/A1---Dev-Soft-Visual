import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tarefa } from "../../models/Tarefa";

function TarefaLista(){
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/tarefas/listar")
            .then(resposta => {
                return resposta.json();
            })
            .then(tarefas => {
                setTarefas(tarefas);
            })
    });

    return (
        <div className="div-lista">
        <h1>Tarefa Lista!</h1>

        <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Categoria</th>
                        <th>Criado Em</th>
                        <th>Status</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map(tarefa => (
                        <tr key={tarefa.tarefaId}>
                            <td>{tarefa.tarefaId}</td>
                            <td>{tarefa.titulo}</td>
                            <td>{tarefa.categoria?.nome}</td>
                            <td>{tarefa.criadoEm}</td>
                            <td>{tarefa.status}</td>
                            <td><Link to={`/pages/tarefas/alterar/${tarefa.tarefaId}`}>Alterar Tarefa</Link></td>
                        </tr>
                    ))}
                </tbody>
        </table>

    </div>
    );
}

export default TarefaLista;