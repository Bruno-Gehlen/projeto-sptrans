#!/bin/bash

# Substitua {seu_token} pelo seu token de acesso da SPTrans
token="fd7b0a464d74c90edf16636a1f20f72a87dcd02fd79bdbf80791c40c02dd0161"

# Autenticação na API com HTTPS e Content-Length: 0
curl -X POST \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Content-Length: 0" \
     "https://api.olhovivo.sptrans.com.br/v2.1/Login/Autenticar?token=${token}"

# Obter a localização dos ônibus da linha 8082 (dados brutos)
curl "https://api.olhovivo.sptrans.com.br/v2.1/Posicao/Linha?codigoLinha=8082" 

