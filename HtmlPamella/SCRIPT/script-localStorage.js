// verifica se existe tarefas no localStorage, se não existir, cria um array vazio
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
// seleciona o elemento input
const inputTarefa = document.querySelector('.campo-tarefa');
//seleciona o elemento botão adicionar
const botaoAdicionar = document.querySelector('.botao-adicionar');
//seleciona o elemento lista de tarefas
const listaTarefas = document.querySelector('.lista-tarefas');

// salva as tarefas no localStorage ao adicionar uma tarefa
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
//edita uma tarefa
function editarTarefa(index) {
    const tarefaAtualizada = prompt("Editar tarefa:", tarefas[index]);
    if (tarefaAtualizada !== null && tarefaAtualizada.trim() !== "") {
        tarefas[index] = tarefaAtualizada;
        salvarTarefas();
        renderizarTarefas();
    }
}
// remove uma tarefa
function removerTarefa(index) {
    tarefas.splice(index, 1);
    salvarTarefas();
    renderizarTarefas();
}

//renderiza as tarefas na tela

function renderizarTarefas() {
    listaTarefas.innerHTML = "";
    // para percorrer o array com as tarefas alocadas e posicionadas na tela(i)
    for (let i = 0; i < tarefas.length; i++) {
        const tarefaTexto = tarefas[i]; //texto da tarefa é o valor do array
        //cria um elemento li para cada tarefa
        const itemLista = document.createElement("li");
        itemLista.className = "item-tarefa";
        itemLista.textContent = tarefaTexto;
        //Cria o elemento botão remover para cada tarefa
        const botaoRemover = document.createElement("button");
        botaoRemover.className = "botao-remover";
        botaoRemover.textContent = "Remover";
        //Cria o elemento botão editar para cada tarefa
        const botaoEditar = document.createElement("button");
        botaoEditar.className = "botao-editar";
        botaoEditar.textContent = "Editar";
        //adiciona o botão (clique) de editar a tarefa
        botaoEditar.addEventListener("click", () => {
            editarTarefa(i);
        });
        //adiciona o botão (clique) de remover a tarefa
        botaoRemover.addEventListener("click", function () {
            removerTarefa(i);
        });
        //adiciona o botão (clique) de remover a tarefa
        itemLista.appendChild(botaoEditar);
        itemLista.appendChild(botaoRemover);
        listaTarefas.appendChild(itemLista);
    }





}
// adicionar tarefas
botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault(); //previne o comportamento padrão do botão
    const novaTarefa = inputTarefa.value.trim(); //pega o valor do input
    if (novaTarefa !== "") { //verifica se o campo não está vazio
        tarefas.push(novaTarefa); //adiciona a tarefa no array
        console.log(tarefas); //exibe o array no console
        inputTarefa.value = ""; //limpa o campo de texto
        salvarTarefas();
        renderizarTarefas(); //atualiza a lista de tarefas
    }
}
);
// mantendo os tarefas após atualizar a pagina
window.addEventListener("load", function () {
    tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    renderizarTarefas();
});