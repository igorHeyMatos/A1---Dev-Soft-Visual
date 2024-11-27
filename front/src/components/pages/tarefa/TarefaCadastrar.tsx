import { useEffect, useState } from "react";
import { Tarefa } from "../../models/Tarefa";
import { Categoria } from "../../models/Categoria";
import axios from "axios";

function TarefaCadastrar(){
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [titulo, setTitulo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [categoriaId, setCategoriaId] = useState<string>('');
    const [status, setStatus] = useState<string>('Não iniciada');

    useEffect(() => {
        axios.get<Categoria[]>("http://localhost:5000/api/categoria/listar")
            .then((resposta) => {
                setCategorias(resposta.data);
            });
    })

    function enviarTarefa(e : any){
        e.preventDefault();

        const tarefa : Tarefa = {
            titulo : titulo,
            descricao : descricao,
            categoriaId: categoriaId,
            status : status,
        }

        fetch("http://localhost:5000/api/tarefas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefa)
            })
            .then(resposta => {
                return resposta.json();
            })
            .then(tarefa => {
                console.log("Tarefa cadastrada!", tarefa)
            })
    }

    return (
        <div id="cadastrar_tarefa">
            <h1>Tarefa Cadastrar</h1>

            <form onSubmit={enviarTarefa}>
                <div className="divs">
                    <label htmlFor="titulo">Titulo:</label>
                    <input type="text" id="titulo" name="titulo" onChange={(e : any) => setTitulo(e.target.value)}  />
                </div>
                
                <div className="divs">
                    <label htmlFor="descricao">Descrição:</label>
                    <input type="text" id="descricao" name="descricao" onChange={(e : any) => setDescricao(e.target.value)}  />
                </div>

                <div className="divs">
                    <label htmlFor="categoriaId">Categoria Id:</label>
                    <input type="text" id="categoriaId" name="categoriaId" onChange={(e : any) => setCategoriaId(e.target.value)}  />
                </div>

                <div className="divs">
                    <label htmlFor="status">Status:</label>
                    <input type="text" id="status" name="status" value={status} onChange={(e : any) => setStatus(e.target.value)}  />
                </div>

                <button type="submit" id="btn_cadastrar">Cadastrar</button>
            </form>
        </div>
    );
}

export default TarefaCadastrar;