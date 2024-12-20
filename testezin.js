async function buscarParadasDaLinha(linha, token) {
  try {
    const urlBase = "http://api.olhovivo.sptrans.com.br/v2.1";
    const headers = { Cookie: `token=${token}` };

    // 1. Buscar o código da linha, tratando erros específicos
    const response = await fetch(`${urlBase}/Linha/Buscar?termosBusca=${linha}`, { headers });
    if (!response.ok) {
      const errorData = await response.json(); 
      const errorMessage = errorData?.mensagem ?? "Erro ao buscar a linha.";
      throw new Error(errorMessage);
    }
    const data = await response.json();
    const codigoLinha = data.sl?.[0]?.cl;
    if (!codigoLinha) {
      throw new Error("Linha não encontrada ou formato de resposta inválido.");
    }

    // 2. Buscar as paradas da linha usando o código da linha
    const responseParadas = await fetch(`${urlBase}/Linha/CarregarDetalhes?codigoLinha=${codigoLinha}`, { headers });
    if (!responseParadas.ok) {
      throw new Error("Erro ao buscar as paradas da linha.");
    }
    const dataParadas = await responseParadas.json();

    // 3. Retornar as paradas, com validação adicional
    return dataParadas.ps ?? []; 
  } catch (error) {
    console.error("Erro ao buscar paradas:", error);
    throw error; // Repassa o erro para quem chamou a função
  }
}

// Exemplo de uso:
const token = "fd7b0a464d74c90edf16636a1f20f72a87dcd02fd79bdbf80791c40c02dd0161"; // Substitua pelo seu token
const linha = "8022-10";

buscarParadasDaLinha(linha, token)
  .then((paradas) => {
    console.log(`Paradas da linha ${linha}:`);
    paradas.forEach((parada) => {
      console.log(`- ${parada.cp} - ${parada.np}`);
    });
  })
  .catch((error) => {
    console.error("Erro na busca:", error); 
  });