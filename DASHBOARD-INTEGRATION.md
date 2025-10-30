# Integração de Pontuação no Dashboard

Este guia explica como utilizar o módulo `scoring.js` para garantir exatamente a mesma pontuação do aplicativo de **Questionário** no **Dashboard**.

## Opção 1 — Usar os valores já salvos

Se o Dashboard consome a tabela `questionarios` ou a view `vw_dados_dashboard`, você pode usar diretamente as colunas:

- `SOMA` (`q.soma`)
- `INDICE_GLOBAL_DE_CIRCULARIDADE` (`q.indice_global_circularidade`)
- `INDICE_DE_MATURIDADE_ESTRUTURANTE` (`q.indice_maturidade_estruturante`)

Esses campos são gravados pelo aplicativo no momento do envio do questionário, seguindo a metodologia do `config.js`.

## Opção 2 — Calcular no Dashboard com `scoring.js`

Inclua `scoring.js` no projeto do Dashboard e aplique a função de cálculo nas linhas retornadas do Supabase.

### Instalação

Copie o arquivo `scoring.js` para o diretório do Dashboard (ex.: `src/utils/scoring.js`).

### Uso com a tabela `questionarios`

```javascript
import { calcularPontuacaoDeLinhaTabela } from './utils/scoring.js';

// row: linha da tabela questionarios
const resultado = calcularPontuacaoDeLinhaTabela(row);
// { pontos, totalPossivel, percentual, grupos, maturidade }
```

### Uso com a view `vw_dados_dashboard`

```javascript
import { calcularPontuacaoDeLinhaView } from './utils/scoring.js';

// row: linha da view vw_dados_dashboard
const resultado = calcularPontuacaoDeLinhaView(row);
// { pontos, totalPossivel, percentual, grupos, maturidade }
```

## Metodologia espelhada

O módulo replica 1:1 os mapas de pontos, grupos e pesos definidos no `questionario/config.js`:

- Pontos por questão (`METODOLOGIA.PONTOS`), incluindo exceções de Q1, Q2, Q5 (invertida) e Q6.
- Grupos (`INPUT`, `RESIDUOS`, `OUTPUT`, `VIDA`, `MONITORAMENTO`).
- Pesos dos grupos (`PESOS`).
- Índice global (pontos/total) e índice de maturidade (média ponderada dos grupos).

## Observações

- Caso futuramente a metodologia mude no `questionario/config.js`, atualize o `scoring.js` no Dashboard para manter alinhamento.
- Se preferir evitar duplicação, o Dashboard pode consumir os três campos calculados diretamente da tabela/view.