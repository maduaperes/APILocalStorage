const apiURL = 'http://localhost:3000/tarefas'; // ajuste a URL conforme seu backend

// Seleção dos elementos do DOM
const formTarefa = document.getElementById('form-tarefa');
const inputTitulo = formTarefa.querySelector('.campo-tarefa');
const inputDescricao = formTarefa.querySelector('.campo-descricao');
const selectStatus = formTarefa.querySelector('.campo-status');
const selectPrioridade = formTarefa.querySelector('.campo-prioridade');
const inputDataEntrega = formTarefa.querySelector('.campo-data-entrega');
const botaoAdicionar = formTarefa.querySelector('.botao-adicionar');
const listaTarefas = document.querySelector('.lista-tarefas');

let tarefaEmEdicaoId = null; // controla edição

// Formata data ISO para dd/mm/aaaa hh:mm
function formatarDataHora(dataISO) {
    const data = new Date(dataISO);
    if (isNaN(data)) return '-';
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Formata data ISO para dd/mm/aaaa
function formatarData(dataISO) {
    const data = new Date(dataISO);
    if (isNaN(data)) return '-';
    return data.toLocaleDateString('pt-BR');
}

// Limpa formulário e estado de edição
function resetarFormulario() {
    formTarefa.reset();
    tarefaEmEdicaoId = null;
    botaoAdicionar.textContent = 'Adicionar Tarefa';
}

// Renderiza lista de tarefas no DOM
async function carregarTarefas() {
    try {
        const resp = await fetch(apiURL);
        if (!resp.ok) throw new Error('Erro ao carregar tarefas');
        const tarefas = await resp.json();

        listaTarefas.innerHTML = '';

        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.className = 'item-tarefa';

            // Conteúdo da tarefa
            const conteudo = document.createElement('div');
            conteudo.className = 'item-tarefa-conteudo';

            const titulo = document.createElement('div');
            titulo.className = 'item-tarefa-titulo';
            titulo.textContent = tarefa.titulo;

            const descricao = document.createElement('div');
            descricao.className = 'item-tarefa-descricao';
            descricao.textContent = tarefa.descricao || '';

            const badges = document.createElement('div');
            badges.className = 'item-tarefa-badges';

            const badgeStatus = document.createElement('span');
            badgeStatus.className = `badge status ${tarefa.status.replace(/\s/g, '\\ ')}`;
            badgeStatus.textContent = tarefa.status;

            const badgePrioridade = document.createElement('span');
            badgePrioridade.className = `badge prioridade ${tarefa.prioridade}`;
            badgePrioridade.textContent = tarefa.prioridade;

            badges.appendChild(badgeStatus);
            badges.appendChild(badgePrioridade);

            const datas = document.createElement('div');
            datas.className = 'item-tarefa-datas';

            const dataCriacao = document.createElement('span');
            dataCriacao.textContent = 'Criada em: ' + formatarDataHora(tarefa.data_criacao);

            const dataEntrega = document.createElement('span');
            dataEntrega.textContent = 'Entrega: ' + (tarefa.data_entrega ? formatarData(tarefa.data_entrega) : '-');

            datas.appendChild(dataCriacao);
            datas.appendChild(dataEntrega);

            conteudo.appendChild(titulo);
            conteudo.appendChild(descricao);
            conteudo.appendChild(badges);
            conteudo.appendChild(datas);

            // Botões ação
            const botoes = document.createElement('div');
            botoes.className = 'item-tarefa-botoes';

            const btnEditar = document.createElement('button');
            btnEditar.className = 'botao-editar';
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => iniciarEdicao(tarefa));

            const btnRemover = document.createElement('button');
            btnRemover.className = 'botao-remover';
            btnRemover.textContent = 'Remover';
            btnRemover.addEventListener('click', () => deletarTarefa(tarefa.id));

            botoes.appendChild(btnEditar);
            botoes.appendChild(btnRemover);

            li.appendChild(conteudo);
            li.appendChild(botoes);

            listaTarefas.appendChild(li);
        });
    } catch (error) {
        alert(error.message);
    }
}

// Função que inicia a edição: preenche formulário e muda botão
function iniciarEdicao(tarefa) {
    tarefaEmEdicaoId = tarefa.id;
    inputTitulo.value = tarefa.titulo;
    inputDescricao.value = tarefa.descricao || '';
    selectStatus.value = tarefa.status;
    selectPrioridade.value = tarefa.prioridade;
    inputDataEntrega.value = tarefa.data_entrega ? tarefa.data_entrega.split('T')[0] : ''; // yyyy-mm-dd

    botaoAdicionar.textContent = 'Salvar alterações';
}

// Função para validar dados antes do envio
function validarDados(tarefa) {
    const statusValidos = ['Pendente', 'Em andamento', 'Concluída'];
    const prioridadeValidas = ['Baixa', 'Média', 'Alta'];

    if (!tarefa.titulo.trim()) {
        alert('Título é obrigatório.');
        return false;
    }

    if (!statusValidos.includes(tarefa.status)) {
        alert('Status inválido.');
        return false;
    }

    if (!prioridadeValidas.includes(tarefa.prioridade)) {
        alert('Prioridade inválida.');
        return false;
    }

    if (tarefa.data_entrega) {
        // Regex para formato YYYY-MM-DD
        if (!/^\d{4}-\d{2}-\d{2}$/.test(tarefa.data_entrega)) {
            alert('Data de entrega inválida. Use o formato YYYY-MM-DD.');
            return false;
        }
    }

    return true;
}

// Cria uma nova tarefa (POST)
async function criarTarefa(tarefa) {
    try {
        const resp = await fetch(apiURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tarefa)
        });
        if (!resp.ok) throw new Error('Erro ao criar tarefa');
        await carregarTarefas();
        resetarFormulario();
    } catch (error) {
        alert(error.message);
    }
}

// Atualiza uma tarefa (PUT)
async function atualizarTarefa(id, tarefa) {
    try {
        const resp = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tarefa)
        });
        if (!resp.ok) throw new Error('Erro ao atualizar tarefa');
        await carregarTarefas();
        resetarFormulario();
    } catch (error) {
        alert(error.message);
    }
}

// Deleta uma tarefa (DELETE)
async function deletarTarefa(id) {
    if (!confirm('Tem certeza que deseja remover esta tarefa?')) return;
    try {
        const resp = await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
        if (!resp.ok) throw new Error('Erro ao deletar tarefa');
        await carregarTarefas();
    } catch (error) {
        alert(error.message);
    }
}

// Manipulador do submit do formulário
formTarefa.addEventListener('submit', e => {
    e.preventDefault();

    const tarefa = {
        titulo: inputTitulo.value.trim(),
        descricao: inputDescricao.value.trim(),
        status: selectStatus.value,
        prioridade: selectPrioridade.value,
        data_entrega: inputDataEntrega.value || null
    };

    if (!validarDados(tarefa)) return;

    if (tarefaEmEdicaoId) {
        atualizarTarefa(tarefaEmEdicaoId, tarefa);
    } else {
        criarTarefa(tarefa);
    }
});

// Carrega as tarefas ao abrir a página
carregarTarefas();
