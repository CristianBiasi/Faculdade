const modalcadastro = new bootstrap.Modal(document.getElementById('modalcadastro'));

var idimovelatual;

function alterar( id) {
  
  fetch("http://127.0.0.1:3333/imovel/" + id)
    .then(resp => resp.json())
    .then(dados => {
      if (dados.length > 0) {
        document.getElementById('endereco').value = dados[0].endereco;
        document.getElementById('cep').value = dados[0].cep;
        document.getElementById('valor').value = dados[0].valor;
        document.getElementById('contato').value = dados[0].contato;
        document.getElementById('status').value = dados[0].STATUS; // Corrigido
        
        modalcadastro.show();
      } else {
        console.error("Erro: Nenhum imóvel encontrado.");
      }
    })
    .catch(err => console.error("Erro ao buscar imóvel:", err));
}

function excluir(id) {
  if (confirm("Tem certeza que deseja excluir este imóvel? Esta ação é irreversível!")) {
    fetch("http://127.0.0.1:3333/imovel/" + id, {  
      method: "DELETE",
    })
    .then(() => {
      alert("Imóvel excluído com sucesso!");
      listar();
    })
    .catch(err => console.error("Erro ao excluir imóvel:", err));
  }
}

function salvar() {
  let vendereco = document.getElementById("endereco").value;
  let vcep = document.getElementById("cep").value;
  let vvalor = document.getElementById("valor").value;
  let vcontato = document.getElementById("contato").value;
  let vstatus = document.getElementById("STATUS").value;

  let imovel = {  
    endereco: vendereco,
    cep: vcep,
    valor: vvalor,
    contato: vcontato,
    STATUS: vstatus
  };

  let url, metodo;
  if (idimovelatual > 0) {
    url = "http://127.0.0.1:3333/imovel/" + idimovelatual;
    metodo = "PUT";
  } else {
    url = "http://127.0.0.1:3333/imovel";
    metodo = "POST";
  }

  fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(imovel)
  })
  .then(() => {
    listar();
    modalcadastro.hide();
  })
  .catch(err => console.error("Erro ao salvar imóvel:", err));
}

function novo() {
  idimovelatual = 0; 
  document.getElementById("endereco").value = "";
  document.getElementById("cep").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("contato").value = "";
  document.getElementById("STATUS").value = "";
  modalcadastro.show();
}

function listar() {
  const listar = document.getElementById("lista");
  listar.innerHTML = "<tr><td colspan='6'>Carregando...</td></tr>";  

  fetch("http://127.0.0.1:3333/imovel")
    .then(resp => resp.json())
    .then(dados => {
        let html = "";
        dados.forEach(imovel => { 
            html += `<tr>
                        <td>${imovel.id}</td>
                        <td>${imovel.endereco}</td>
                        <td>${imovel.cep}</td>
                        <td>${imovel.valor}</td>
                        <td>${imovel.contato}</td>
                        <td>${imovel.STATUS}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="alterar(${imovel.id})">Alterar</button>
                            <button class="btn btn-danger btn-sm" onclick="excluir(${imovel.id})">Excluir</button>
                        </td>
                     </tr>`;
        });
        document.getElementById("lista").innerHTML = html;
    })
    .catch(err => console.error("Erro ao buscar imóveis:", err));
}

function mostrar(dados) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  for (let i in dados) {
    lista.innerHTML += "<tr>"
      + "<td>" + dados[i].id + "</td>"
      + "<td>" + dados[i].endereco + "</td>"
      + "<td>" + dados[i].cep + "</td>"
      + "<td>" + dados[i].valor + "</td>"
      + "<td>" + dados[i].contato + "</td>"
      + "<td>" + dados[i].STATUS + "</td>"
      + "<td>" 
      + "<button type='button' class='btn btn-secondary' onclick='alterar(" + dados[i].id + ")'>Alterar</button> "
      + "<button type='button' class='btn btn-danger' onclick='excluir(" + dados[i].id + ")'>Excluir</button>"
      + "</td>"
      + "</tr>";
  }
}
