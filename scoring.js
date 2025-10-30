// scoring.js — Módulo de pontuação para uso no Dashboard
// Espelha exatamente a metodologia de pontuação presente em questionario/config.js
// Uso: importe este módulo no Dashboard e aplique às respostas vindas do Supabase

export const MAPEAMENTO_RESPOSTAS = {
  1: 'materia_prima',
  2: 'residuos',
  3: 'desmonte',
  4: 'descarte',
  5: 'recuperacao',
  6: 'reciclagem',
  7: 'durabilidade',
  8: 'reparavel',
  9: 'reaproveitavel',
  10: 'ciclo_estendido',
  11: 'ciclo_rastreado',
  12: 'documentacao'
};

export const METODOLOGIA = {
  PONTOS: {
    // Q1 - matéria-prima
    1: { 1: 0, 2: 2, 3: 3, 4: 2, 5: 1 },
    // Q2 - resíduos
    2: { 1: 0, 2: 2, 3: 1 },
    // Q5 - descarte em aterro (invertido: Sim = 0, Não = 2)
    5: { 1: 0, 2: 2, 3: 1 },
    // Q6 - recuperação de energia (Sim = 1, Não = 0, Não sei = 1)
    6: { 1: 1, 2: 0, 3: 1 },
    // Padrão para Q3..Q12 (Sim=2, Não=0, Não sei=1)
    default: { 1: 2, 2: 0, 3: 1 }
  },
  GRUPOS: {
    INPUT: [1],
    RESIDUOS: [2],
    OUTPUT: [3, 4, 5, 6],
    VIDA: [7, 8, 9],
    MONITORAMENTO: [10, 11, 12]
  },
  PESOS: {
    INPUT: 0.25,
    RESIDUOS: 0.20,
    OUTPUT: 0.20,
    VIDA: 0.20,
    MONITORAMENTO: 0.15
  }
};

export function calcularPontuacaoDeRespostas(respostasObj) {
  const MET = METODOLOGIA;
  const r = respostasObj; // {1: valor, 2: valor, ..., 12: valor}
  let pontos = 0;
  let totalPossivel = 0;

  for (let i = 1; i <= 12; i++) {
    const mapa = MET.PONTOS[i] || MET.PONTOS.default;
    const max = Math.max(...Object.values(mapa));
    totalPossivel += max;
    const val = r[i];
    if (val != null && mapa[val] != null) pontos += mapa[val];
  }

  const percentual = totalPossivel > 0 ? Math.round((pontos / totalPossivel) * 100) : 0;

  const grupos = {};
  let somaPesos = 0;
  let somaPonderada = 0;
  for (const [nomeGrupo, ids] of Object.entries(MET.GRUPOS)) {
    const peso = MET.PESOS[nomeGrupo] || 1;
    let ptsGrupo = 0;
    let maxGrupo = 0;
    ids.forEach((qid) => {
      const mapa = MET.PONTOS[qid] || MET.PONTOS.default;
      const max = Math.max(...Object.values(mapa));
      maxGrupo += max;
      const val = r[qid];
      if (val != null && mapa[val] != null) ptsGrupo += mapa[val];
    });
    const percGrupo = maxGrupo > 0 ? Math.round((ptsGrupo / maxGrupo) * 100) : 0;
    grupos[nomeGrupo] = percGrupo;
    somaPesos += peso;
    somaPonderada += percGrupo * peso;
  }
  const maturidade = somaPesos > 0 ? Math.round(somaPonderada / somaPesos) : percentual;

  return { pontos, totalPossivel, percentual, grupos, maturidade };
}

// Para linha da tabela questionarios
export function calcularPontuacaoDeLinhaTabela(row) {
  const r = {};
  for (let i = 1; i <= 12; i++) {
    const coluna = MAPEAMENTO_RESPOSTAS[i];
    r[i] = row[coluna];
  }
  return calcularPontuacaoDeRespostas(r);
}

// Para linha da VIEW vw_dados_dashboard (colunas em MAIÚSCULO)
export const MAPEAMENTO_VIEW = {
  1: 'MATERIA_PRIMA',
  2: 'RESIDUOS',
  3: 'DESMONTE',
  4: 'DESCARTE',
  5: 'RECUPERACAO',
  6: 'RECICLAGEM',
  7: 'DURABILIDADE',
  8: 'REPARAVEL',
  9: 'REAPROVEITAVEL',
  10: 'CICLO_ESTENDIDO',
  11: 'CICLO_RASTREADO',
  12: 'DOCUMENTACAO'
};

export function calcularPontuacaoDeLinhaView(row) {
  const r = {};
  for (let i = 1; i <= 12; i++) {
    const coluna = MAPEAMENTO_VIEW[i];
    r[i] = row[coluna];
  }
  return calcularPontuacaoDeRespostas(r);
}