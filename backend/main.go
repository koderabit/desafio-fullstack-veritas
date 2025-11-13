package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/tarefas", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" {
			listarTarefas(w, r)
		} else if r.Method == "POST" {
			adicionarTarefa(w, r)
		} else {
			http.Error(w, "Método não suportado", http.StatusMethodNotAllowed)
		}
	})

	http.HandleFunc("/tarefas/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "PUT" {
			atualizarTarefa(w, r)
		} else if r.Method == "DELETE" {
			deletarTarefa(w, r)
		} else {
			http.Error(w, "Método não suportado", http.StatusMethodNotAllowed)
		}
	})

	fmt.Println("Servidor Koderabit rodando em http://localhost:8080")
	http.ListenAndServe(":8080", habilitarCORS(http.DefaultServeMux))
}

