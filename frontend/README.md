# Mini Kanban

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Mini Kanban é uma aplicação para gerenciamento de tarefas, permitindo criar, mover e excluir tarefas entre as colunas **A Fazer**, **Em Progresso** e **Concluído**. O projeto possui **frontend em React** e **backend em Go**, se comunicando via **API RESTful** com JSON. Ele foi desenvolvido para demonstrar conceitos de gerenciamento de tarefas e fluxo de dados simples, com foco em modularidade, usabilidade e manutenção.

O backend é construído em Go para fornecer endpoints REST que permitem criar, atualizar, mover e excluir tarefas. O frontend em React utiliza Hooks (`useState`, `useEffect`) para controlar o estado das tarefas e atualizar a interface dinamicamente. A comunicação entre frontend e backend ocorre através de JSON, mantendo a simplicidade e clareza na troca de informações.

---

## 🚀 Como rodar o projeto

### Backend (Go)
1. Certifique-se de ter o [Go](https://go.dev/dl/) instalado.
2. Abra o terminal na pasta `backend`.
3. Execute o comando:

```bash
go run main.go handlers.go models.go
```
O backend estará disponível em http://localhost:8080.

### Frontend (React)
1. Certifique-se de ter o [Node.js](https://nodejs.org/pt) instalado.
2. Abra o terminal na pasta `frontend`.
3. Instale as dependências:

```bash
npm install
```

Inicie o frontend:
```bash
npm start
```
O frontend será aberto em http://localhost:3000. Certifique-se de que o backend esteja rodando antes de usar o frontend.

#### Limitações conhecidas e melhorias futuras

Atualmente, o projeto apresenta algumas limitações, como persistência de dados apenas em memória, ausência de autenticação de usuários e design responsivo básico, que ainda pode ser aprimorado para dispositivos móveis. Também não há filtros avançados, buscas ou notificações de tarefas.

Como melhorias futuras, é possível implementar banco de dados (SQLite, PostgreSQL) para persistência, adicionar autenticação e suporte a múltiplos usuários, melhorar o design responsivo e UX, implementar filtros, buscas e categorização de tarefas, notificações de tarefas vencidas ou lembretes, além de histórico de alterações ou logs de atividades para rastrear mudanças.

#### Créditos
Desenvolvido por Erick Oliveira, dono da conta [Koderabit](https://github.com/koderabit) no GitHub.