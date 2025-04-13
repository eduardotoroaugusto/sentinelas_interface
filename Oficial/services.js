async function salvarFormulario(idenAgente, formularioDto) {
  const url = `http://localhost:8080/formulario/${idenAgente}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formularioDto),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar formulário");
  }

  return await response.text();
}

async function editarFormulario(idenFormulario, formularioDto) {
  const url = `http://localhost:8080/formulario/${idenFormulario}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formularioDto),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar formulário");
  }

  return await response.text();
}

async function validarFormulario(idenFormulario, idenValidador) {
  const url = `http://localhost:8080/formulario/validar/${idenFormulario}/${idenValidador}`;

  const response = await fetch(url, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Erro ao validar formulário");
  }

  return await response.text();
}

const formularioDto = {
  campo1: "valor1",
  campo2: "valor2",
};

salvarFormulario(1, formularioDto)
  .then((resposta) => {
    console.log("Formulário salvo:", resposta);
  })
  .catch((err) => {
    console.error("Erro:", err);
  });

async function listarAgentes() {
  const url = "http://localhost:8080/pessoa";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar agentes");
  }

  return await response.json(); // retorna array de objetos Pessoa
}

async function listarSupervisores() {
  const url = "http://localhost:8080/pessoa/supervisores";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar supervisores");
  }

  return await response.json();
}

async function buscarValidadorFormulario(idenFormulario) {
  const url = `http://localhost:8080/pessoa/buscarvalidador/${idenFormulario}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar validador do formulário");
  }

  return await response.json(); // retorna objeto Pessoa
}

async function realizarLogin(cpf, senha) {
  const params = new URLSearchParams({ cpf, senha });
  const url = `http://localhost:8080/pessoa/login?${params.toString()}`;

  const response = await fetch(url, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Erro ao realizar login");
  }

  return await response.text(); // resposta como "sucesso" ou mensagem de erro
}
