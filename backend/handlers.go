package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

func listarTarefas(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tarefas)
}


func adicionarTarefa(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var nova Tarefa
	json.NewDecoder(r.Body).Decode(&nova)
	nova.ID = len(tarefas) + 1
	tarefas = append(tarefas, nova)
	json.NewEncoder(w).Encode(nova)
}


func atualizarTarefa(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	partes := strings.Split(r.URL.Path, "/")
	if len(partes) < 3 {
		http.Error(w, "ID não informado", http.StatusBadRequest)
		return
	}
	id, _ := strconv.Atoi(partes[2])

	var atualizada Tarefa
	json.NewDecoder(r.Body).Decode(&atualizada)

	for i, t := range tarefas {
		if t.ID == id {
			tarefas[i].Titulo = atualizada.Titulo
			tarefas[i].Descricao = atualizada.Descricao
			tarefas[i].Status = atualizada.Status
			json.NewEncoder(w).Encode(tarefas[i])
			return
		}
	}

	http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
}


func deletarTarefa(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	partes := strings.Split(r.URL.Path, "/")
	if len(partes) < 3 {
		http.Error(w, "ID não informado", http.StatusBadRequest)
		return
	}
	id, _ := strconv.Atoi(partes[2])

	for i, t := range tarefas {
		if t.ID == id {
			tarefas = append(tarefas[:i], tarefas[i+1:]...)
			json.NewEncoder(w).Encode(map[string]string{"mensagem": "Tarefa removida com sucesso!"})
			return
		}
	}

	http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
}


func habilitarCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
