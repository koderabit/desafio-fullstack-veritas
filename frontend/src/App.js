import React, { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");


  const carregarTarefas = async () => {
    try {
      const resposta = await fetch("http://localhost:8080/tarefas");
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (erro) {
      console.error("Erro ao buscar tarefas:", erro);
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  // add Nova tarefa
  const adicionarTarefa = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao) return alert("Preencha todos os campos!");

    const novaTarefa = {
      titulo,
      descricao,
      status: "afazer",
    };

    try {
      const resposta = await fetch("http://localhost:8080/tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaTarefa),
      });

      if (!resposta.ok) throw new Error("Erro ao adicionar tarefa");
      setTitulo("");
      setDescricao("");
      carregarTarefas();
    } catch (erro) {
      console.error(erro);
    }
  };

// Mover tarefas entre colunas
  const moverTarefa = async (id, novoStatus) => {
    try {
      const tarefa = tarefas.find((t) => t.id === id);
      if (!tarefa) return;

      const resposta = await fetch(`http://localhost:8080/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...tarefa, status: novoStatus }),
      });

      if (!resposta.ok) throw new Error("Erro ao mover tarefa");
      carregarTarefas();
    } catch (erro) {
      console.error(erro);
    }
  };

// Excluir tarefa
  const excluirTarefa = async (id) => {
  try {
    const resposta = await fetch(`http://localhost:8080/tarefas/${id}`, {
      method: "DELETE",
    });

    if (!resposta.ok) throw new Error("Erro ao excluir tarefa");
    carregarTarefas(); // Atualiza a lista
  } catch (erro) {
    console.error(erro);
  }
};

  return (
  <div className="kanban-container">
    <h1>📋 Mini Kanban - Veritas</h1>

    {/* Formulário */}
    <form className="kanban-form" onSubmit={adicionarTarefa}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>

    {/* Colunas */}
      <div className="kanban-board">
        <div className="kanban-column">
          <h2>🕓 A Fazer</h2>
          {tarefas
            .filter((t) => t.status === "afazer")
            .map((t) => (
              <div key={t.id} className="tarefa">
                <h4>{t.titulo}</h4>
                <p>{t.descricao}</p>
                <div className="botoes-mover">
                  <button onClick={() => moverTarefa(t.id, "emprogresso")}>
                    ➡️ Em Progresso
                  </button>
                  <button onClick={() => moverTarefa(t.id, "concluida")}>
                    ✅ Concluída
                  </button>
                  <button onClick={() => excluirTarefa(t.id)}>
                    ❌ Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="kanban-column">
          <h2>🏗️ Em Progresso</h2>
          {tarefas
            .filter((t) => t.status === "emprogresso")
            .map((t) => (
              <div key={t.id} className="tarefa">
                <h4>{t.titulo}</h4>
                <p>{t.descricao}</p>
                <div className="botoes-mover">
                  <button onClick={() => moverTarefa(t.id, "afazer")}>
                    ⬅️ A Fazer
                  </button>
                  <button onClick={() => moverTarefa(t.id, "concluida")}>
                    ✅ Concluída
                  </button>
                  <button onClick={() => excluirTarefa(t.id)}>
                    ❌ Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="kanban-column">
          <h2>✅ Concluído</h2>
          {tarefas
            .filter((t) => t.status === "concluida")
            .map((t) => (
              <div key={t.id} className="tarefa">
                <h4>{t.titulo}</h4>
                <p>{t.descricao}</p>
                <div className="botoes-mover">
                  <button onClick={() => moverTarefa(t.id, "afazer")}>
                    ⬅️ A Fazer
                  </button>
                  <button onClick={() => moverTarefa(t.id, "emprogresso")}>
                    ➡️ Em Progresso
                  </button>
                  <button onClick={() => excluirTarefa(t.id)}>
                    ❌ Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      
      {/* Rodapé */}
    <footer>
      Desenvolvido por <a href="https://github.com/koderabit" target="_blank">Koderabit</a>
    </footer>
    </div>
  );
}

export default App;
