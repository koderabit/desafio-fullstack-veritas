package main

type Tarefa struct {
	ID        int    `json:"id"`
	Titulo    string `json:"titulo"`
	Descricao string `json:"descricao"`
	Status    string `json:"status"` 
}

var tarefas = []Tarefa{
	{ID: 1, Titulo: "Revisar Fluxo de Processos", Descricao: "Mapear e otimizar os processos internos da empresa", Status: "afazer"},
	{ID: 2, Titulo: "Preparar Relatório Financeiro", Descricao: "Consolidar dados de receitas e despesas do mês", Status: "afazer"},
	{ID: 3, Titulo: "Analisar Indicadores de Desempenho", Descricao: "Avaliar KPIs para identificar áreas de melhoria", Status: "afazer"},
	{ID: 4, Titulo: "Treinamento da Equipe", Descricao: "Planejar e ministrar treinamento sobre novos procedimentos administrativos", Status: "afazer"},
}
