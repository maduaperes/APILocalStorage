//Importa o framework Express para facilitar a criação de APIs com Node.js

const express = require('express');
 
//Importa o módulo cors para permitir requisições de diferentes origens

const cors = require('cors');
 
//Cria uma instância da aplicação Express

const app = express();
 
//Define a porta em que o servidor irá rodar

const PORT = 3000;
 
//Aplica o middleware cors para permitir requisições de diferentes origens

app.use(cors());
 
/*Aplica o middleware express.json() que permite receber

e interpretar JSON no corpo das requisições (red.body)*/

app.use(express.json());
 
//Array em memória para simular um banco de dados

let tarefas = [];
 
/*------------------ ROTAS DA API ------------------*/
 
//Rota GET - Retorna a lista com todas as tarefas

app.get('/tarefas', (req, res) => {

  res.json(tarefas); //Responde com a lista de tarefas em formato JSON

});
 
//Rota POST - Adiciona uma nova tarefa à lista

app.post('/tarefas', (req, res) => {

  //Extrai o campo 'texto' enviado no corpo da requisição

  const { texto } = req.body; 

  //Validação simples: verifica se o campo 'texto' foi enviado

    if (!texto) {

        //Se não foi enviado, responde com erro 400 (Bad Request)

        return res.status(400).json({ error: 'Texto da tarefa é obrigatório' });

    }

  //Cria um novo objeto tarefa com ID único baseado no timestamp atual

  const novaTarefa = { id: Date.now(), texto };
 
  //Adiciona a nova tarefa ao array de tarefas

  tarefas.push(novaTarefa); 

  //Responde com a nova tarefa criada e o código HTTP (status) 201 => Criado

  res.status(201).json(novaTarefa); 

});
 
//Rota PUT - Atualiza uma tarefa existente

app.put('/tarefas/:id', (req, res) => {

  //Obtém o ID da tarefa a ser atualizada a partir dos parâmetros da URL

  const id = parseInt(req.params.id);

  //Extrai o novo texto enviado no corpo da requisição

  const { texto } = req.body;
 
  //Encontra o índice da tarefa a ser atualizada no array de tarefas

  const index = tarefas.find(tarefa => tarefa.id == id);
 
  //Validação: verifica se a tarefa existe

  if (!index) {

    //Se não existe, responde com erro 404 (Not Found)

    return res.status(404).json({ error: 'Tarefa não encontrada' });

  }
 
    //Se um novo texto foi enviado, atualiza o campo 'texto' da tarefa

    if (texto)  {

       index.texto = texto; 

    }

    //Se não foi enviado, mantém o texto atual

    else {

       index.texto = index.texto;

    }

  //Responde com a tarefa atualizada

  res.json(tarefas[index]); 

});
 
//Rota DELETE - Remove uma tarefa existente

app.delete('/tarefas/:id', (req, res) => {

  //Obtém o ID da tarefa a ser removida a partir dos parâmetros da URL

  const id = parseInt(req.params.id); 

  //Encontra o índice da tarefa a ser removida no array de tarefas

  const index = tarefas.find(tarefa => tarefa.id == id);
 
  //Validação: verifica se a tarefa existe

  if (!index) {

    //Se não existe, responde com erro 404 (Not Found)

    return res.status(404).json({ error: 'Tarefa não encontrada' });

  }
 
  //Remove a tarefa do array de tarefas

  tarefas = tarefas.filter(tarefa => tarefa.id != id); 

  //Responde com sucesso (status 204) sem conteúdo, indicando que a operação foi bem-sucedida

  res.sendStatus(204); 

});
 
//Inicia o servidor na porta definida e exibe uma mensagem no console

app.listen(PORT, () => {

  console.log(`Servidor rodando na porta ${PORT}`); 

});
 