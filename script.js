let isAdmin = false;
let abaAtual = "jogos";

function showSection(sectionId) {
  document.querySelectorAll("main section").forEach(sec => sec.style.display = "none");
  const sec = document.getElementById(sectionId);
  if(sec) sec.style.display = "block";

  document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
  const navLink = [...document.querySelectorAll("nav a")].find(a => a.getAttribute("onclick")?.includes(sectionId));
  if(navLink) navLink.classList.add("active");

  if(sectionId === "acervo") {
    mostrarAbaAcervo(abaAtual);
  }
}

// Mostrar abas dentro do acervo
function mostrarAbaAcervo(aba) {
  abaAtual = aba;
  const abas = ["jogos","livros","quadrinhos","consoles"];

  abas.forEach(a => {
    // Botões abas
    const btn = [...document.querySelectorAll(".aba-btn")].find(b => b.textContent.toLowerCase() === a);
    if(btn) btn.classList.toggle("active", a === aba);

    // Formulários
    document.getElementById(`form-${a}`).style.display = (a === aba && isAdmin) ? "block" : "none";

    // Listas
    document.getElementById(`lista-${a}`).style.display = (a === aba) ? "block" : "none";
  });

  // Mostrar formulário se admin
  const form = document.getElementById("form-cadastro");
  form.style.display = isAdmin ? "block" : "none";

  atualizarListasAcervo();
}

// Carregar dados do localStorage para cada tipo
function carregarAcervo(tipo) {
  return JSON.parse(localStorage.getItem("acervo_" + tipo)) || [];
}

// Atualizar todas as listas de acervo
function atualizarListasAcervo() {
  atualizarListaJogos();
  atualizarListaLivros();
  atualizarListaQuadrinhos();
  atualizarListaConsoles();
}

// Atualizar lista Jogos
function atualizarListaJogos() {
  let lista = document.getElementById("lista-jogos");
  lista.innerHTML = "";
  let jogos = carregarAcervo("jogos");

  jogos.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item-acervo";
    div.innerHTML = `
      <h4>${item.titulo}</h4>
      <p><strong>Código:</strong> ${item.codigo}</p>
      <p><strong>Quantidade de Jogadores:</strong> ${item.jogadores}</p>
      <p><strong>Doador:</strong> ${item.doador}</p>
      <p><strong>Descrição:</strong> ${item.descricao}</p>
      <p><strong>Observação:</strong> ${item.observacao}</p>
    `;
    if(isAdmin) {
      const acoes = document.createElement("div");
      acoes.className = "acoes";
      acoes.innerHTML = `
        <button onclick="editarItem('jogos', ${i})">✏️</button>
        <button onclick="excluirItem('jogos', ${i})">🗑️</button>
      `;
      div.appendChild(acoes);
    }
    lista.appendChild(div);
  });
}

// Atualizar lista Livros
function atualizarListaLivros() {
  let lista = document.getElementById("lista-livros");
  lista.innerHTML = "";
  let livros = carregarAcervo("livros");

  livros.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item-acervo";
    div.innerHTML = `
      <h4>${item.titulo}</h4>
      <p><strong>Código:</strong> ${item.codigo}</p>
      <p><strong>Doador:</strong> ${item.doador}</p>
      <p><strong>Descrição:</strong> ${item.descricao}</p>
      <p><strong>Observação:</strong> ${item.observacao}</p>
    `;
    if(isAdmin) {
      const acoes = document.createElement("div");
      acoes.className = "acoes";
      acoes.innerHTML = `
        <button onclick="editarItem('livros', ${i})">✏️</button>
        <button onclick="excluirItem('livros', ${i})">🗑️</button>
      `;
      div.appendChild(acoes);
    }
    lista.appendChild(div);
  });
}

// Atualizar lista Quadrinhos
function atualizarListaQuadrinhos() {
  let lista = document.getElementById("lista-quadrinhos");
  lista.innerHTML = "";
  let quad = carregarAcervo("quadrinhos");

  quad.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item-acervo";
    div.innerHTML = `
      <h4>${item.nome}</h4>
      <p><strong>Várias Edições:</strong> ${item.variasEdicoes}</p>
      <p><strong>Edições:</strong> ${item.edicoes}</p>
      <p><strong>Código:</strong> ${item.codigo}</p>
      <p><strong>Doador:</strong> ${item.doador}</p>
      <p><strong>Observação:</strong> ${item.observacao}</p>
    `;
    if(isAdmin) {
      const acoes = document.createElement("div");
      acoes.className = "acoes";
      acoes.innerHTML = `
        <button onclick="editarItem('quadrinhos', ${i})">✏️</button>
        <button onclick="excluirItem('quadrinhos', ${i})">🗑️</button>
      `;
      div.appendChild(acoes);
    }
    lista.appendChild(div);
  });
}

// Atualizar lista Consoles
function atualizarListaConsoles() {
  let lista = document.getElementById("lista-consoles");
  lista.innerHTML = "";
  let cons = carregarAcervo("consoles");

  cons.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item-acervo";
    div.innerHTML = `
      <h4>${item.tipo}</h4>
      <p><strong>Código:</strong> ${item.codigo}</p>
      <p><strong>Doador:</strong> ${item.doador}</p>
      <p><strong>Observação:</strong> ${item.observacao}</p>
    `;
    if(isAdmin) {
      const acoes = document.createElement("div");
      acoes.className = "acoes";
      acoes.innerHTML = `
        <button onclick="editarItem('consoles', ${i})">✏️</button>
        <button onclick="excluirItem('consoles', ${i})">🗑️</button>
      `;
      div.appendChild(acoes);
    }
    lista.appendChild(div);
  });
}

// Capturar dados dos formulários para salvar
function getFormData(tipo) {
  switch(tipo) {
    case "jogos":
      return {
        titulo: document.getElementById("titulo").value,
        codigo: document.getElementById("codigo").value,
        jogadores: document.getElementById("jogadores").value,
        doador: document.getElementById("doador").value,
        descricao: document.getElementById("descricao").value,
        observacao: document.getElementById("observacao").value,
      };
    case "livros":
      return {
        titulo: document.getElementById("titulo-livro").value,
        codigo: document.getElementById("codigo-livro").value,
        doador: document.getElementById("doador-livro").value,
        descricao: document.getElementById("descricao-livro").value,
        observacao: document.getElementById("observacao-livro").value,
      };
    case "quadrinhos":
      return {
        nome: document.getElementById("nome-quad").value,
        variasEdicoes: document.getElementById("varias-edicoes-quad").value,
        edicoes: document.getElementById("edicoes-quad").value,
        codigo: document.getElementById("codigo-quad").value,
        doador: document.getElementById("doador-quad").value,
        observacao: document.getElementById("observacao-quad").value,
      };
    case "consoles":
      return {
        tipo: document.getElementById("tipo-console").value,
        codigo: document.getElementById("codigo-console").value,
        doador: document.getElementById("doador-console").value,
        observacao: document.getElementById("observacao-console").value,
      };
  }
  return {};
}

function setFormData(tipo, dados) {
  switch(tipo) {
    case "jogos":
      document.getElementById("titulo").value = dados.titulo || "";
      document.getElementById("codigo").value = dados.codigo || "";
      document.getElementById("jogadores").value = dados.jogadores || "";
      document.getElementById("doador").value = dados.doador || "";
      document.getElementById("descricao").value = dados.descricao || "";
      document.getElementById("observacao").value = dados.observacao || "";
      break;
    case "livros":
      document.getElementById("titulo-livro").value = dados.titulo || "";
      document.getElementById("codigo-livro").value = dados.codigo || "";
      document.getElementById("doador-livro").value = dados.doador || "";
      document.getElementById("descricao-livro").value = dados.descricao || "";
      document.getElementById("observacao-livro").value = dados.observacao || "";
      break;
    case "quadrinhos":
      document.getElementById("nome-quad").value = dados.nome || "";
      document.getElementById("varias-edicoes-quad").value = dados.variasEdicoes || "Sim";
      document.getElementById("edicoes-quad").value = dados.edicoes || "";
      document.getElementById("codigo-quad").value = dados.codigo || "";
      document.getElementById("doador-quad").value = dados.doador || "";
      document.getElementById("observacao-quad").value = dados.observacao || "";
      break;
    case "consoles":
      document.getElementById("tipo-console").value = dados.tipo || "";
      document.getElementById("codigo-console").value = dados.codigo || "";
      document.getElementById("doador-console").value = dados.doador || "";
      document.getElementById("observacao-console").value = dados.observacao || "";
      break;
  }
}

document.getElementById("form-cadastro").addEventListener("submit", function(e) {
  e.preventDefault();
  let acervo = carregarAcervo(abaAtual);

  if(this.dataset.editIndex !== undefined) {
    acervo[this.dataset.editIndex] = getFormData(abaAtual);
    delete this.dataset.editIndex;
  } else {
    acervo.push(getFormData(abaAtual));
  }

  localStorage.setItem("acervo_" + abaAtual, JSON.stringify(acervo));
  atualizarListasAcervo();
  this.reset();
});

function excluirItem(tipo, index) {
  if(!confirm("Confirma exclusão deste item do acervo?")) return;
  let acervo = carregarAcervo(tipo);
  acervo.splice(index, 1);
  localStorage.setItem("acervo_" + tipo, JSON.stringify(acervo));
  atualizarListasAcervo();
}

function editarItem(tipo, index) {
  let acervo = carregarAcervo(tipo);
  let item = acervo[index];
  mostrarAbaAcervo(tipo);
  setFormData(tipo, item);

  const form = document.getElementById("form-cadastro");
  form.dataset.editIndex = index;
  form.style.display = isAdmin ? "block" : "none";
}

// Fluxos

function salvarFluxos(fluxos) {
  localStorage.setItem("fluxos", JSON.stringify(fluxos));
}

function carregarFluxos() {
  return JSON.parse(localStorage.getItem("fluxos")) || [];
}

function atualizarTabelaFluxos() {
  let tabela = document.querySelector("#tabela-fluxos tbody");
  tabela.innerHTML = "";
  let fluxos = carregarFluxos();

  fluxos.forEach((f, index) => {
    let linha = tabela.insertRow();
    linha.insertCell(0).textContent = f.data;
    linha.insertCell(1).textContent = f.descricao || "";
    linha.insertCell(2).textContent = (f.totalVisitantes !== undefined && f.totalVisitantes !== null) ? f.totalVisitantes : "-";

    let cellAcoes = linha.insertCell(3);
    if(isAdmin) {
      cellAcoes.innerHTML = `
        <button onclick="editarFluxo(${index})">✏️</button>
        <button onclick="excluirFluxo(${index})">🗑️</button>
      `;
      cellAcoes.style.display = "";
    } else {
      cellAcoes.style.display = "none";
    }
  });

  document.getElementById("acoes-fluxos-header").style.display = isAdmin ? "" : "none";
}

document.getElementById("form-fluxo").addEventListener("submit", function(e) {
  e.preventDefault();
  let fluxos = carregarFluxos();

  const totalVisitantesValue = document.getElementById("total-visitantes").value;
  const totalVisitantes = totalVisitantesValue ? parseInt(totalVisitantesValue) : null;

  if(this.dataset.editIndex !== undefined) {
    fluxos[this.dataset.editIndex] = {
      data: document.getElementById("data-fluxo").value,
      descricao: document.getElementById("desc-fluxo").value,
      totalVisitantes: totalVisitantes
    };
    delete this.dataset.editIndex;
  } else {
    fluxos.push({
      data: document.getElementById("data-fluxo").value,
      descricao: document.getElementById("desc-fluxo").value,
      totalVisitantes: totalVisitantes
    });
  }

  salvarFluxos(fluxos);
  atualizarTabelaFluxos();
  this.reset();
});

function excluirFluxo(index) {
  if(!confirm("Confirma exclusão deste registro de fluxo?")) return;
  let fluxos = carregarFluxos();
  fluxos.splice(index, 1);
  salvarFluxos(fluxos);
  atualizarTabelaFluxos();
}

function editarFluxo(index) {
  let fluxos = carregarFluxos();
  let fluxo = fluxos[index];

  document.getElementById("data-fluxo").value = fluxo.data;
  document.getElementById("desc-fluxo").value = fluxo.descricao || "";
  document.getElementById("total-visitantes").value = fluxo.totalVisitantes !== undefined ? fluxo.totalVisitantes : "";

  const form = document.getElementById("form-fluxo");
  form.dataset.editIndex = index;
  form.style.display = isAdmin ? "block" : "none";
}

// Login e controle admin
const btnLoginHeader = document.getElementById("btn-login-header");
const btnLogoutHeader = document.getElementById("btn-logout-header");
const modalLogin = document.getElementById("modal-login");
const closeLogin = document.getElementById("close-login");
const formLogin = document.getElementById("form-login");
const loginError = document.getElementById("login-error");
const formCadastro = document.getElementById("form-cadastro");
const formFluxo = document.getElementById("form-fluxo");

btnLoginHeader.addEventListener("click", () => {
  modalLogin.style.display = "flex";
  loginError.style.display = "none";
});

btnLogoutHeader.addEventListener("click", () => {
  logoutAdmin();
});

closeLogin.addEventListener("click", () => {
  modalLogin.style.display = "none";
});

window.addEventListener("click", e => {
  if(e.target === modalLogin) {
    modalLogin.style.display = "none";
  }
});

formLogin.addEventListener("submit", e => {
  e.preventDefault();
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  // Usuário e senha fixos para admin
  if(user === "Lab.level" && pass === "acervo.level.2025") {
    loginAdmin();
    modalLogin.style.display = "none";
    formLogin.reset();
  } else {
    loginError.style.display = "block";
  }
});

function loginAdmin() {
  isAdmin = true;
  btnLoginHeader.style.display = "none";
  btnLogoutHeader.style.display = "inline-block";

  // Mostrar formulários e botões ação
  formCadastro.style.display = "block";
  formFluxo.style.display = "block";

  atualizarListasAcervo();
  atualizarTabelaFluxos();
  mostrarAbaAcervo(abaAtual);
}

function logoutAdmin() {
  isAdmin = false;
  btnLoginHeader.style.display = "inline-block";
  btnLogoutHeader.style.display = "none";

  formCadastro.style.display = "none";
  formFluxo.style.display = "none";

  if(formCadastro.dataset.editIndex) {
    delete formCadastro.dataset.editIndex;
    formCadastro.reset();
  }

  if(formFluxo.dataset.editIndex) {
    delete formFluxo.dataset.editIndex;
    formFluxo.reset();
  }

  atualizarListasAcervo();
  atualizarTabelaFluxos();

  showSection('home');
}

// Inicialização da página
window.onload = () => {
  showSection('home');
  atualizarListasAcervo();
  atualizarTabelaFluxos();
};