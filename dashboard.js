import { calcularPontuacaoDeLinhaView, calcularPontuacaoDeLinhaTabela } from './scoring.js';

const CONFIG = (typeof window !== 'undefined' && window.QUESTIONARIO_CONFIG) ? window.QUESTIONARIO_CONFIG : null;

function fmtPct(n) {
  return `${(n * 100).toFixed(1)}%`;
}

function setStatus(text, error = false) {
  const el = document.getElementById('statusText');
  if (!el) return;
  el.textContent = text;
  el.className = error ? 'text-red-600' : 'text-gray-700';
}

function setEnvInfo() {
  const el = document.getElementById('envInfo');
  if (!el) return;
  if (!CONFIG) {
    el.textContent = 'Configuração ausente';
    return;
  }
  const url = CONFIG.SUPABASE_URL ? new URL(CONFIG.SUPABASE_URL) : null;
  el.textContent = url ? `Supabase: ${url.host}` : 'Supabase não configurado';
}

async function carregarDados() {
  if (!CONFIG || !window.supabase) {
    setStatus('Erro: config.js ou Supabase SDK não carregado.', true);
    return { dados: [], origem: 'nenhuma' };
  }

  const client = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

  // Primeiro tenta a view vw_dados_dashboard (preferida)
  try {
    const { data, error } = await client.from('vw_dados_dashboard').select('*');
    if (error) throw error;
    if (data && Array.isArray(data) && data.length > 0) {
      return { dados: data, origem: 'view' };
    }
  } catch (e) {
    console.warn('Falha ao ler vw_dados_dashboard:', e.message);
  }

  // Fallback: tabela questionarios
  try {
    const { data, error } = await client.from('questionarios').select('*');
    if (error) throw error;
    if (data && Array.isArray(data) && data.length > 0) {
      return { dados: data, origem: 'tabela' };
    }
  } catch (e) {
    console.error('Falha ao ler questionarios:', e.message);
  }

  return { dados: [], origem: 'nenhuma' };
}

function renderizarTabela(dados, origem) {
  const body = document.getElementById('tabelaBody');
  body.innerHTML = '';

  const linhas = [];
  let somaPct = 0;
  let somaMat = 0;

  for (const row of dados) {
    let calc;
    if (origem === 'view') {
      calc = calcularPontuacaoDeLinhaView(row);
    } else if (origem === 'tabela') {
      calc = calcularPontuacaoDeLinhaTabela(row);
    } else {
      continue;
    }

    const empresa = origem === 'view' ? (row.SETOR ?? '-') : (row.empresa_id ?? '-');
    const produto = origem === 'view' ? (row.PRODUTO ?? '-') : (row.produto_avaliado ?? '-');
    const soma = (row.SOMA ?? row.soma ?? calc.pontos ?? 0);

    somaPct += calc.percentual;
    somaMat += calc.maturidade.total;

    linhas.push({ empresa, produto, indice: calc.percentual, maturidade: calc.maturidade.total, soma });
  }

  for (const l of linhas) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${l.empresa}</td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${l.produto}</td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${fmtPct(l.indice)}</td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${fmtPct(l.maturidade)}</td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${l.soma}</td>
    `;
    body.appendChild(tr);
  }

  const total = linhas.length || 1;
  const mediaIndice = somaPct / total;
  const mediaMaturidade = somaMat / total;

  const summary = document.getElementById('summary');
  summary.classList.remove('hidden');
  document.getElementById('totalAvaliacoes').textContent = `${linhas.length}`;
  document.getElementById('mediaIndice').textContent = fmtPct(mediaIndice);
  document.getElementById('mediaMaturidade').textContent = fmtPct(mediaMaturidade);
  document.getElementById('ultimaAtualizacao').textContent = new Date().toLocaleString('pt-BR');
}

async function main() {
  setEnvInfo();
  setStatus('Carregando dados do Supabase e calculando índices...');

  const { dados, origem } = await carregarDados();
  if (!dados.length) {
    setStatus('Nenhum dado encontrado. Verifique a view ou a tabela no Supabase.', true);
    return;
  }

  try {
    renderizarTabela(dados, origem);
    setStatus(`Dados carregados da ${origem === 'view' ? 'view vw_dados_dashboard' : 'tabela questionarios'} com metodologia idêntica ao questionário.`);
  } catch (e) {
    console.error(e);
    setStatus('Erro ao renderizar dashboard: ' + e.message, true);
  }
}

main();