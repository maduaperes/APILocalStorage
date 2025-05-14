let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

const inputTarefa = document.getElementById("campo-tarefa");

const botaoAdicionar = document.getElementById("botao-adicionar");

const listaTarefas = document.getElementById("lista-tarefas");

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function editarTarefa(index) {
    const tarefaAtualizada = prompt("Editar tarefa:", tarefas[index]);
    if (tarefaAtualizada !== null && tarefaAtualizada.trim() !== "") {
        tarefas[index] = tarefaAtualizada;
        salvarTarefas();
        renderizarTarefas();
    }
}

function removerTarefa(index) {
    tarefas.splice(index, 1);
    salvarTarefas();
    renderizarTarefas();
}

function renderizarTarefas() {
    listaTarefas.innerHTML = "";
    for (let i = 0; i < tarefas.length; i++) {
        const tarefaTexto = tarefas[i];
        const itemLista = document.createElement("li");
        itemLista.className = "item-tarefa";
        itemLista.textContent = tarefaTexto;

        const botaoRemover = document.createElement("button");
        botaoRemover.className = "botao-remover";
        botaoRemover.textContent = "Remover";

        const botaoEditar = document.createElement("button");
        botaoEditar.className = "botao-editar";
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", () => editarTarefa(i));

        botaoRemover.addEventListener("click", () => removerTarefa(i));

        itemLista.appendChild(botaoRemover);
        itemLista.appendChild(botaoEditar);
        listaTarefas.appendChild(itemLista);
    }
}
 botaoAdicionar.addEventListener("click",
    function (evento){
        evento.preventDefault();

        const novaTarefa = inputTarefa.value.trim();
        if (novaTarefa !== "") {
            tarefas.push(novaTarefa);
            inputTarefa.value = "";
            renderizarTarefas();
        }
    }
);
