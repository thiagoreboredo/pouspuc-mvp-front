/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/tarefas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.tarefas.forEach(item => insertList(item.titulo, item.descricao, item.concluido))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputTitulo, inputDescricao) => {
  const formData = new FormData();
  formData.append('titulo', inputTitulo);
  formData.append('descricao', inputDescricao);

  let url = 'http://127.0.0.1:5000/tarefa';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => { 
      if (response.status == "409") { 
        alert("Tarefa já existe !")
      } else {
        (response) => response.json();
        insertList(inputTitulo, inputDescricao, false);
        alert("Tarefa adicionada!");
      }
     })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let botao = document.createElement("img");
  botao.src = "imagens/trash.svg";
  span.className = "close";
  span.appendChild(botao);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/tarefa?titulo=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputTarefa = document.getElementById("novoTitulo").value;
  let inputDescricao = document.getElementById("novaDescricao").value;

  if (inputTarefa === '') {
    alert("Escreva o título da tarefa!");
  } else {
    postItem(inputTarefa, inputDescricao);
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (tarefa, descricao, concluido) => {
  var item = [tarefa, descricao, concluido]
  var table = document.getElementById('myTable');
  var row = table.insertRow();
  row.className = "text-center";
  let conteudoCelula = "";
  for (var i = 0; i < item.length; i++) {
    if (i == 2) {
      if (item[i] == "true") {
        conteudoCelula = "<img src='imagens/bookmark-check-fill.svg'></img>";
      } else {
        conteudoCelula = "<img src='imagens/bookmark.svg'></img>";
      }
    } else {
      conteudoCelula = item[i];
    }
    var cel = row.insertCell(i);
    cel.innerHTML = conteudoCelula;
  }
  insertButton(row.insertCell(-1))
  document.getElementById("novoTitulo").value = "";
  document.getElementById("novaDescricao").value = "";

  removeElement()
}