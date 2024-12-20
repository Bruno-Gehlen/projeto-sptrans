const token = 'fd7b0a464d74c90edf16636a1f20f72a87dcd02fd79bdbf80791c40c02dd0161';
const nomeParada = 'Balthazar da Veiga ';

async function buscarParada() {
  try {
    // Primeiro: Autenticação da API ===================
    const authResponse = await fetch(
      `https://api.olhovivo.sptrans.com.br/v2.1/Login/Autenticar?token=${token}`,
      { method: 'POST' }
    );

    if (!authResponse.ok) {
      const authText = await authResponse.text();
      throw new Error(`Erro na autenticação: ${authResponse.status} ${authResponse.statusText} - ${authText}`);
    }

    const authResult = await authResponse.text();
    console.log('Autenticação:', authResult);

    if (authResult !== 'true') {
      throw new Error(`Autenticação falhou.`);
    }
    // Fim da autenticação da API ===================


    // Segundo: Buscar a parada ===================
    const paradaResponse = await fetch(
      `https://api.olhovivo.sptrans.com.br/v2.1/Parada/Buscar?termosBusca=${nomeParada}`
    );

    if (!paradaResponse.ok) {
      throw new Error(`Erro ao buscar parada: ${paradaResponse.status} ${paradaResponse.statusText}`);
    }

    const paradaData = await paradaResponse.json();
    console.log('Dados da parada:', paradaData);
    // Fim da busca da parada ===================

  } catch (error) {
    console.error(error);
  }
}

buscarParada();