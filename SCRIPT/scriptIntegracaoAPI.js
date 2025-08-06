const urlAPI = "http://localhost:3000/tarefas";

const inputTarefa = document.querySelector(".campo-tarefa");

const botaoAdicionar = document.querySelector(".botao-adicionar");

const listaTarefas = document.querySelector(".lista-tarefas");

async function adicionarTarefa(titulo) {
    try {

      await fetch(urlAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({titulo: titulo}),
        });
        
        renderizarTarefas();
    }
    catch(error){
        console.error("Erro ao adicionar tarefa:", error);
    }
    
}

async function renderizarTarefas() {
    listaTarefas.innerHTML = '';
    try{
        const resposta = await fetch(urlAPI)
        const tarefas = await resposta.json();

        tarefas.forEach(tarefa => {
            const itemLista = document.createElement("li");
            itemLista.className = 'item-tarefa';
            itemLista.textContent = tarefa.titulo;

            const botaoRemover = document.createElement('button');
            botaoRemover.className = 'botao-remover';
            botaoRemover.textContent = 'Excluir';

            const botaoEditar = document.createElement('button');
            botaoEditar.className = 'botao-editar';
            botaoEditar.textContent = 'Editar';

            itemLista.appendChild(botaoRemover);
            itemLista.appendChild(botaoEditar);
            listaTarefas.appendChild(itemLista);
        })
    }catch(error){
        console.error("Erro", error)
    }
}

botaoAdicionar.addEventListener("click", function (evento){
    evento.preventDefault();
    const novaTarefa = inputTarefa.value.trim();
    if (novaTarefa !== ""){
        adicionarTarefa(novaTarefa);
        inputTarefa.value = "";
    }
});

renderizarTarefas();