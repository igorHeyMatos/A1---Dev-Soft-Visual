import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tarefa } from "../../models/Tarefa";
import { Categoria } from "../../models/Categoria";

function TarefaAlterar(){
    const { id } = useParams();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [titulo, setTitulo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [categoriaId, setCategoriaId] = useState<string>('');
    const [status, setStatus] = useState<string>('Não iniciada');

    useEffect(() => {
        if(id){
            axios.get<Tarefa>(`http://localhost:5000/api/tarefas/buscar/${id}`)
                .then(resposta => {
                    setTitulo(resposta.data.titulo);
                    setDescricao(resposta.data.descricao);
                    setCategoriaId(resposta.data.categoriaId);
                    setStatus(resposta.data.status);
                    buscarCategorias();
                })
        }
    }, []);

    function buscarCategorias(){
        axios.get<Categoria[]>("http://localhost:5000/api/categoria/listar")
            .then((resposta) => {
                setCategorias(resposta.data);
            });
    }

    function enviarTarefa(e : any){
        e.preventDefault();

        const tarefa : Tarefa = {
            titulo : titulo,
            descricao : descricao,
            categoriaId: categoriaId,
            status : status,
        };

        axios.put(`http://localhost:5000/api/tarefas/alterar/${id}`, tarefa)
        .then(resposta => {
            console.log(resposta.data);
        }) 
    }

    return (
        <div id="alterar-tarefa">
            <h1>Alterar Tarefa</h1>

            <form onSubmit={enviarTarefa}>
                <div className="divs">
                    <label htmlFor="status">Status:</label>
                    <input type="text" id="status" name="status" value={status} onChange={(e : any) => setStatus(e.target.value)}  />
                </div>

                <button type="submit" id="btn_cadastrar">Cadastrar</button>
            </form>
        </div>
    );


}

export default TarefaAlterar;