const urlAPI = "http://localhost:3000/tarefas";

const inputTarefa = document.querySelector(".campo-tarefa");
const botaoAdicionar = document.querySelector(".botao-adicionar");
const listaTarefas = document.querySelector(".lista-tarefas");

// Adicionar tarefa
async function adicionarTarefa(titulo) {
    try {
        await fetch(urlAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, concluida: false }),
        });
        renderizarTarefas();
    } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
    }
}

// Remover tarefa
async function removerTarefa(id) {
    try {
        await fetch(`${urlAPI}/${id}`, { method: "DELETE" });
        renderizarTarefas();
    } catch (error) {
        console.error("Erro ao remover tarefa:", error);
    }
}

// Editar tarefa (PUT completo)
async function editarTarefa(id, novoTitulo) {
    try {
        // Buscar tarefa original
        const resposta = await fetch(`${urlAPI}/${id}`);
        if (!resposta.ok) {
            throw new Error(`Tarefa ${id} não encontrada`);
        }
        const tarefaOriginal = await resposta.json();

        // Criar nova versão com título atualizado
        const tarefaAtualizada = { ...tarefaOriginal, titulo: novoTitulo };

        // Enviar para o servidor
        await fetch(`${urlAPI}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarefaAtualizada),
        });

        renderizarTarefas();
    } catch (error) {
        console.error("Erro ao editar tarefa:", error);
    }
}

// Renderizar tarefas
async function renderizarTarefas() {
    listaTarefas.innerHTML = "";
    try {
        const resposta = await fetch(urlAPI);
        const tarefas = await resposta.json();

        tarefas.forEach((tarefa) => {
            const itemLista = document.createElement("li");
            itemLista.className = "item-tarefa";
            itemLista.textContent = tarefa.titulo;
            itemLista.id = tarefa.id;

            const botoes = document.createElement("div");
            botoes.style.marginLeft = "10px";
            botoes.style.display = "inline-flex";
            botoes.style.gap = "5px";

            const botaoEditar = document.createElement("button");
            botaoEditar.className = "botao-editar";
            botaoEditar.innerHTML =
                'Editar <img src="../img/editar.png" alt="Editar" style="width: 15px; height: 15px;">';
            botaoEditar.addEventListener("click", () => {
                const novoTitulo = prompt("Digite o novo título da tarefa:", tarefa.titulo);
                if (novoTitulo && novoTitulo.trim() !== "" && novoTitulo !== tarefa.titulo) {
                    editarTarefa(tarefa.id, novoTitulo.trim());
                }
            });

            const botaoRemover = document.createElement("button");
            botaoRemover.className = "botao-remover";
            botaoRemover.innerHTML =
                '<img src="../img/remover.png" alt="Remover" style="width: 20px; height: 20px;">';
            botaoRemover.addEventListener("click", () => removerTarefa(tarefa.id));

            botoes.appendChild(botaoEditar);
            botoes.appendChild(botaoRemover);
            itemLista.appendChild(botoes);

            listaTarefas.appendChild(itemLista);
        });
    } catch (error) {
        console.error("Erro ao renderizar tarefas:", error);
    }
}

// Evento de adicionar tarefa
botaoAdicionar.addEventListener("click", (evento) => {
    evento.preventDefault();
    const novaTarefa = inputTarefa.value.trim();
    if (novaTarefa !== "") {
        adicionarTarefa(novaTarefa);
        inputTarefa.value = "";
    }
});

// Carregar lista no início
renderizarTarefas();

// Adicionar tarefa com Enter
inputTarefa.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const novaTarefa = inputTarefa.value.trim();
        if (novaTarefa !== "") {
            adicionarTarefa(novaTarefa);
            inputTarefa.value = "";
        }
    }
});
