const input = document.getElementById('input');
const addButton = document.getElementById('addButton');
const list = document.getElementById('list');

// Teste da lista
let tasks = [];
let task;

const btnExcluirList = document.querySelector('.containerRemoveActions');

input.focus();
list.innerHTML = '';

addButton.addEventListener('click', () => {
    // Mostra uma borda vermelha caso o usuario tente criar uma nv task sem nome
    if (input.value === '' || input.value === null) {
        input.classList.add('campo-tarefa-erro');
        input.classList.add('placeholderErro');
        input.placeholder = "Digite o nome da nova tarefa";
        input.focus();
        return;
    }

    tasks.push(input.value);
    console.log(tasks);

    for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];
    }

    // criação dos elementos por js
    const elementList = document.createElement('li');
    elementList.setAttribute('class', 'item-tarefa add-animation');

    const titleAndCheckbox = document.createElement('div');
    titleAndCheckbox.setAttribute('class', 'containerInfos');

    const labelCheckBox = document.createElement('label');
    labelCheckBox.setAttribute('class', 'custom-checkbox');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.setAttribute('class', 'checkBox');

    const checkBoxSpan = document.createElement('span');
    checkBoxSpan.setAttribute('class', 'checkmark');

    const titleTask = document.createElement('p');
    titleTask.textContent = task;
    titleTask.style.fontSize = '20px';

    const containerBtns = document.createElement('div');
    containerBtns.setAttribute('class', 'containerActionBtns');

    const btnEdit = document.createElement('button');
    btnEdit.setAttribute('class', 'containerRemoveActions');

    const btnExcluir = document.createElement('button');
    btnExcluir.setAttribute('class', 'containerRemoveActions');

    const imgExcluir = document.createElement('img');
    imgExcluir.setAttribute('src', '../assets/icons/delete icone.png');

    const imgEdit = document.createElement('img');
    imgEdit.setAttribute('src', '../assets/icons/edit icone.png');

    // Montando eles na lista e mostrando na tela
    btnEdit.appendChild(imgEdit);
    btnExcluir.appendChild(imgExcluir);
    containerBtns.appendChild(btnEdit);
    containerBtns.appendChild(btnExcluir);

    labelCheckBox.appendChild(checkBox);
    labelCheckBox.appendChild(checkBoxSpan);

    titleAndCheckbox.appendChild(labelCheckBox);

    titleAndCheckbox.appendChild(titleTask);

    elementList.appendChild(titleAndCheckbox);
    elementList.appendChild(containerBtns);

    list.appendChild(elementList);

    // limpa o input
    input.value = '';
    input.focus();

    // remove a classe de animação após concluir
    elementList.addEventListener('animationend', () => {
        elementList.classList.remove('add-animation');
    }, { once: true }); // garante que só executa uma vez

    // Ação para marcar como concluida ( só riscar a palavra )
    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            titleTask.style.textDecoration = 'line-through';
            titleTask.style.opacity = '0.6';
        } else {
            titleTask.style.textDecoration = 'none';
            titleTask.style.opacity = '1';
        }
    });
});

// Ao digitar após dar erro visual no input tira a borda vermelha, cor do placeholder e atualiza o texto do placeholder
input.addEventListener('input', () => {
    if (input.classList.contains('campo-tarefa-erro') && input.value.trim() !== '') {

        input.classList.remove('campo-tarefa-erro');
        input.classList.remove('placeholderErro');

        input.classList.add('placeholder');
        input.placeholder = "Nova tarefa";
    }
});

// Ação para deletar a task selecionada
list.addEventListener('click', (event) => {
    // verifica se o clique foi em um botão de exclusão
    const isDeleteButton = event.target.closest('button')?.querySelector('img[src="../assets/icons/delete icone.png"]');

    if (isDeleteButton) {
        const li = event.target.closest('li');
        li.classList.add('remove-animation');

        li.addEventListener('animationend', () => {
            li.remove();
        });

        // aprendendo a pegar a tag sem saber de qual lista está mechendo
        const taskText = li.querySelector('p')?.textContent;

        // removendo da lista pelo valor do título
        const index = tasks.indexOf(taskText);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
    }
});