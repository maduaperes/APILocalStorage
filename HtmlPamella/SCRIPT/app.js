//Array para armazenar as tarefas
var tarefas = [];
 
const inputTarefa = document.querySelector(".campo-tarefa");
const botaoAdicionar = document.querySelector(".botao-adicionar");
const listaTarefas = document.querySelector(".lista-tarefas");
//Função para adicionar uma tarefa
function renderizarTarefas(){
    listaTarefas.innerHTML = "";
    //para percorrer a array com as tarefas alocadas e posicionadas na tela (i)
    for (var i = 0; i < tarefas.length; i++){
        const tarefaTexto = tarefas[i];
 
        //cria um elemento li para cada tarefa
    const itemLista = document.createElement("li");
    itemLista.className = "item-tarefa";
    itemLista.textContent = tarefaTexto;
 
    const botaoRemover = document.createElement("button");
    botaoRemover.className = "botao-remover";
    botaoRemover.textContent = "Remover";
 
    const botaoEditar = document.createElement("button");
    botaoEditar.className = "botao-editar";
    botaoEditar.textContent = "Editar";
 
    //adiciona o botão (clique) de remover a tarefa
    botaoRemover.addEventListener("click", function(i) {
        tarefas.splice(i, 1); //remove a tarefa do array
        renderizarTarefas(); //atualiza a lista de tarefas
    });
    li.appendChild(botaoRemover); //adiciona o botão de remover a tarefa
    listaTarefas.appendChild(li); //adiciona a tarefa na lista de tarefas
    }
    // Evento para adicionar a tarefa
    botaoAdicionar.addEventListener("click", function() {
        const novaTarefa = inputTarefa.value.trim(); //pega o valor do input
        if (novaTarefa !== "") { //verifica se o campo não está vazio
            tarefas.push(novaTarefa); //adiciona a tarefa no array
            inputTarefa.value = ""; //limpa o campo de texto
            renderizarTarefas(); //atualiza a lista de tarefas
        }
    });
}
 