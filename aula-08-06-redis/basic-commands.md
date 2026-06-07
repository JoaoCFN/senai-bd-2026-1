SET chave valor: Salva um dado.

No CLI: SET usuario:1 "Joao Silva"

GET chave: Busca um dado.

No CLI: GET usuario:1

EXPIRE chave segundos: Adiciona um "prazo de validade" a uma chave existente.

No CLI: EXPIRE usuario:1 30 (A chave se autodestruirá em 30 segundos).

TTL chave: (Time To Live) Pergunta ao Redis quanto tempo falta para a chave morrer.

No CLI: TTL usuario:1 (Retorna os segundos restantes. Retorna -2 se já morreu, ou -1 se não tem validade).

SETEX chave segundos valor: Faz o SET e o EXPIRE em um comando só (Super usado no Node.js).

No CLI: SETEX sessao:999 60 "usuario_logado"


--------------------------------

HSET chave campo valor: Salva propriedades dentro de um objeto.

No CLI: HSET perfil:10 nome "Carlos" idade "25" status "ativo"

HGET chave campo: Pega apenas uma propriedade específica.

No CLI: HGET perfil:10 idade (Retorna apenas "25").

HGETALL chave: Traz o objeto inteiro.

No CLI: HGETALL perfil:10