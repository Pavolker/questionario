// Aplicativo do Questionário de Circularidade
(() => {
    'use strict';
    
    const CONFIG = window.QUESTIONARIO_CONFIG;
    const QUESTÕES = CONFIG.QUESTÕES;
    
    const elementos = {
        termosScreen: document.getElementById('termosScreen'),
        identificacaoScreen: document.getElementById('identificacaoScreen'),
        questionarioScreen: document.getElementById('questionarioScreen'),
        confirmacaoScreen: document.getElementById('confirmacaoScreen'),
        aceitarTermos: document.getElementById('aceitarTermos'),
        btnContinuar: document.getElementById('btnContinuar'),
        btnVoltarTermos: document.getElementById('btnVoltarTermos'),
        formIdentificacao: document.getElementById('formIdentificacao')
    };
    
    const dados = {
        empresa: {},
        respostas: {},
        questaoAtual: 0
    };
    
    // Event Listeners
    elementos.aceitarTermos.addEventListener('change', function() {
        elementos.btnContinuar.disabled = !this.checked;
    });
    
    elementos.btnContinuar.addEventListener('click', () => {
        elementos.termosScreen.classList.add('hidden');
        elementos.identificacaoScreen.classList.remove('hidden');
    });
    
    elementos.btnVoltarTermos.addEventListener('click', () => {
        elementos.identificacaoScreen.classList.add('hidden');
        elementos.termosScreen.classList.remove('hidden');
    });
    
    elementos.formIdentificacao.addEventListener('submit', function(e) {
        e.preventDefault();
        
        dados.empresa = {
            nomeEmpresa: document.getElementById('nomeEmpresa').value,
            cnpj: document.getElementById('cnpj').value,
            nomeResponsavel: document.getElementById('nomeResponsavel').value,
            email: document.getElementById('email').value,
            setorEconomico: document.getElementById('setorEconomico').value,
            produtoAvaliado: document.getElementById('produtoAvaliado').value
        };
        
        iniciarQuestionario();
    });
    
    function iniciarQuestionario() {
        elementos.identificacaoScreen.classList.add('hidden');
        elementos.questionarioScreen.classList.remove('hidden');
        
        dados.questaoAtual = 0;
        renderizarQuestao();
    }
    
    function renderizarQuestao() {
        const questao = QUESTÕES[dados.questaoAtual];
        const html = `
            <div class="bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
                <div class="mb-6">
                    <div class="text-sm text-blue-600 font-semibold mb-2">${questao.categoria}</div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Questão ${questao.id} de ${QUESTÕES.length}</h2>
                </div>
                
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold text-gray-800">${questao.pergunta}</h3>
                    ${questao.subtitulo ? `<p class="text-sm text-gray-600">${questao.subtitulo}</p>` : ''}
                    
                    <form id="formQuestao" class="space-y-3">
                        ${questao.opcoes.map(opcao => `
                            <label class="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group">
                                <input type="radio" name="resposta" value="${opcao.valor}" required class="mt-1 accent-blue-600">
                                <span class="text-gray-700 group-hover:text-gray-900">${opcao.label}</span>
                            </label>
                        `).join('')}
                    </form>
                    
                    <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
                        <button id="btnAnterior" class="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors">
                            ← Anterior
                        </button>
                        <button id="btnProximo" form="formQuestao" type="submit" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                            ${dados.questaoAtual === QUESTÕES.length - 1 ? 'Finalizar' : 'Próximo →'}
                        </button>
                    </div>
                    
                    <div class="mt-4">
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${((dados.questaoAtual + 1) / QUESTÕES.length) * 100}%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-2 text-center">${dados.questaoAtual + 1} de ${QUESTÕES.length}</p>
                    </div>
                </div>
            </div>
        `;
        
        elementos.questionarioScreen.innerHTML = html;
        
        // Event listeners para o formulário
        const formQuestao = document.getElementById('formQuestao');
        formQuestao.addEventListener('submit', function(e) {
            e.preventDefault();
            const resposta = formQuestao.querySelector('input[name="resposta"]:checked').value;
            dados.respostas[questao.id] = parseInt(resposta);
            proximaQuestao();
        });
        
        const btnAnterior = document.getElementById('btnAnterior');
        if (dados.questaoAtual > 0) {
            btnAnterior.addEventListener('click', questaoAnterior);
        } else {
            btnAnterior.style.display = 'none';
        }
    }
    
    function proximaQuestao() {
        if (dados.questaoAtual < QUESTÕES.length - 1) {
            dados.questaoAtual++;
            renderizarQuestao();
        } else {
            finalizarQuestionario();
        }
    }
    
    function questaoAnterior() {
        if (dados.questaoAtual > 0) {
            dados.questaoAtual--;
            renderizarQuestao();
        }
    }
    
    async function finalizarQuestionario() {
        try {
            console.log('Salvando dados no Supabase...');
            
            // Inicializar cliente Supabase
            const { createClient } = supabase;
            const client = createClient(
                CONFIG.SUPABASE_URL,
                CONFIG.SUPABASE_ANON_KEY || localStorage.getItem('supabase_anon_key') || ''
            );
            
            // 1. Salvar dados da empresa
            const { data: empresaData, error: empresaError } = await client
                .from('empresas')
                .insert([{
                    nome_empresa: dados.empresa.nomeEmpresa,
                    cnpj: dados.empresa.cnpj,
                    nome_responsavel: dados.empresa.nomeResponsavel,
                    email: dados.empresa.email,
                    setor_economico: dados.empresa.setorEconomico,
                    produto_avaliado: dados.empresa.produtoAvaliado
                }])
                .select()
                .single();
            
            if (empresaError) throw empresaError;
            
            // 2. Preparar dados do questionário usando o mapeamento
            const questionarioData = {
                empresa_id: empresaData.id,
                materia_prima: dados.respostas[1] || null,
                residuos: dados.respostas[2] || null,
                desmonte: dados.respostas[3] || null,
                descarte: dados.respostas[4] || null,
                recuperacao: dados.respostas[5] || null,
                reciclagem: dados.respostas[6] || null,
                durabilidade: dados.respostas[7] || null,
                reparavel: dados.respostas[8] || null,
                reaproveitavel: dados.respostas[9] || null,
                ciclo_estendido: dados.respostas[10] || null,
                ciclo_rastreado: dados.respostas[11] || null,
                documentacao: dados.respostas[12] || null
            };
            
            // 3. Salvar dados do questionário
            const { error: questionarioError } = await client
                .from('questionarios')
                .insert([questionarioData]);
            
            if (questionarioError) throw questionarioError;
            
            console.log('Dados salvos com sucesso!');
            mostrarConfirmacao();
            
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            mostrarErro(error.message);
        }
    }
    
    function mostrarErro(mensagem) {
        elementos.confirmacaoScreen.classList.remove('hidden');
        elementos.confirmacaoScreen.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto">
                <div class="text-center">
                    <div class="text-6xl mb-4">⚠️</div>
                    <h2 class="text-3xl font-bold text-red-600 mb-4">Erro ao Salvar</h2>
                    <p class="text-gray-600 mb-6">Ocorreu um erro ao salvar seus dados.</p>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                        <p class="text-sm text-red-800">${mensagem}</p>
                    </div>
                    <button onclick="window.location.href='index.html'" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Tentar Novamente
                    </button>
                </div>
            </div>
        `;
    }
    
    function mostrarConfirmacao() {
        elementos.questionarioScreen.classList.add('hidden');
        elementos.confirmacaoScreen.classList.remove('hidden');
        
        elementos.confirmacaoScreen.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto">
                <div class="text-center">
                    <div class="text-6xl mb-4">✅</div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Questionário Concluído!</h2>
                    <p class="text-gray-600 mb-6">Obrigado por participar do pré-diagnóstico de circularidade.</p>
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
                        <h3 class="font-bold text-blue-900 mb-3">Próximos Passos:</h3>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li>• Os dados foram salvos com sucesso</li>
                            <li>• Você receberá os resultados por e-mail</li>
                            <li>• O dashboard de análise estará disponível em breve</li>
                        </ul>
                    </div>
                    <button onclick="window.location.href='/'" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Voltar ao Início
                    </button>
                </div>
            </div>
        `;
    }
    
    // Inicialização
    console.log('Aplicativo do Questionário carregado');
    console.log('Total de questões:', QUESTÕES.length);
    
})();

