// Configuração do Questionário de Circularidade
window.QUESTIONARIO_CONFIG = {
    // Configurações do Supabase
    SUPABASE_URL: 'https://glkaisjobfpzopftjkfe.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsa2Fpc2pvYmZwem9wZnRqa2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzYwMzIsImV4cCI6MjA3NzE1MjAzMn0.LTpw3Sb_j2GMK80p5GyU1gskAu6NlsRAJeFhrrwefsw', // Adicione sua anon key aqui
    
    // Estrutura das 12 questões
    QUESTÕES: [
        // ENTRADA (INPUT) - Q1
        {
            id: 1,
            categoria: 'ENTRADA (INPUT)',
            pergunta: 'Origem e tipo de matéria-prima adquirida pela empresa na produção do produto indicado',
            subtitulo: 'Que tipo de matéria prima você usa para produção do produto que você indicou:',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Utilizo principalmente (mais ou menos 80%) matérias-primas virgens.' },
                { valor: 2, label: 'Utilizo principalmente (mais ou menos 80%) matérias-primas recicladas.' },
                { valor: 3, label: 'Utilizo principalmente (mais ou menos 80%) da matéria prima de aproveitamento de resíduos de outros processos produtivos.' },
                { valor: 4, label: 'Utilizo principalmente (mais ou menos 80%) da matéria prima provenientes de fontes renováveis.' },
                { valor: 5, label: 'Não sei.' }
            ],
            obrigatoria: true
        },
        
        // GESTÃO DE RESÍDUOS - Q2
        {
            id: 2,
            categoria: 'GESTÃO DE RESÍDUOS',
            pergunta: 'Gestão de Resíduos - Resíduos gerados pelos processos produtivos',
            subtitulo: 'Eliminação de resíduos da produção relativa ao produto que você indicou:',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'A maioria (mais de 50%) dos resíduos de produção são destinados para descarte em aterros sanitários.' },
                { valor: 2, label: 'A maioria (mais de 50%) dos resíduos de produção são destinados principalmente aos processos de reciclagem, reuso e reaproveitamento.' },
                { valor: 3, label: 'A maioria (mais de 50%) dos resíduos de produção são destinados a processos de produção de energia (Recuperação de energia).' }
            ],
            obrigatoria: true
        },
        
        // SAÍDA DO PRODUTO (OUTPUT) - Q3
        {
            id: 3,
            categoria: 'SAÍDA DO PRODUTO (OUTPUT)',
            pergunta: 'Os materiais dos quais o produto é realizado podem ser desmontados para facilitar o descarte adequado',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Sim' },
                { valor: 2, label: 'Não' },
                { valor: 3, label: 'Não sei' }
            ],
            obrigatoria: true
        },
        
        // SAÍDA DO PRODUTO (OUTPUT) - Q4
        {
            id: 4,
            categoria: 'SAÍDA DO PRODUTO (OUTPUT)',
            pergunta: 'Os materiais dos quais o produto é realizado poderão ser utilizados principalmente a processo de reciclagem',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Sim' },
                { valor: 2, label: 'Não' },
                { valor: 3, label: 'Não sei' }
            ],
            obrigatoria: true
        },
        
        // SAÍDA DO PRODUTO (OUTPUT) - Q5
        {
            id: 5,
            categoria: 'SAÍDA DO PRODUTO (OUTPUT)',
            pergunta: 'Os materiais dos quais o produto é realizado poderão ser destinados principalmente para descarte em aterros sanitários',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Sim (vai para aterro)' },
                { valor: 2, label: 'Não' },
                { valor: 3, label: 'Não sei' }
            ],
            obrigatoria: true
        },
        
        // SAÍDA DO PRODUTO (OUTPUT) - Q6
        {
            id: 6,
            categoria: 'SAÍDA DO PRODUTO (OUTPUT)',
            pergunta: 'Os materiais dos quais o produto é realizado poderão ser utilizados principalmente aos processos de produção de energia (Recuperação de energia)',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Sim' },
                { valor: 2, label: 'Não' },
                { valor: 3, label: 'Não sei' }
            ],
            obrigatoria: true
        },
        
        // VIDA DO PRODUTO - Q7
        {
            id: 7,
            categoria: 'VIDA DO PRODUTO',
            pergunta: 'QUALIDADE: Você ou seus fornecedores testam o PRODUTO de acordo com a durabilidade',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Sim' },
                { valor: 2, label: 'Não' },
                { valor: 3, label: 'Não sei' }
            ],
            obrigatoria: true
        },
        
        // VIDA DO PRODUTO - Q8
        {
            id: 8,
            categoria: 'VIDA DO PRODUTO',
            pergunta: 'DESIGN: O PRODUTO é projetado para ser reparável com possíveis defeitos ou ao desgaste',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Sim' },
                { valor: 2, label: 'Não' },
                { valor: 3, label: 'Não sei' }
            ],
            obrigatoria: true
        },
        
        // VIDA DO PRODUTO - Q9
        {
            id: 9,
            categoria: 'VIDA DO PRODUTO',
            pergunta: 'DESIGN: O PRODUTO é projetado para ser reaproveitado ou reutilizado em novos processos produtivos',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Sim' },
                { valor: 2, label: 'Não' },
                { valor: 3, label: 'Não sei' }
            ],
            obrigatoria: true
        },
        
        // MONITORAMENTO - Q10
        {
            id: 10,
            categoria: 'MONITORAMENTO',
            pergunta: 'O ciclo de vida do produto é estendido através da prestação de serviços pós-venda adicionais',
            subtitulo: '(coleta de produtos usados para descarte ou reutilização, assistência de limpeza e manutenção, etc.)',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Sim' },
                { valor: 2, label: 'Não' },
                { valor: 3, label: 'Não sei' }
            ],
            obrigatoria: true
        },
        
        // MONITORAMENTO - Q11
        {
            id: 11,
            categoria: 'MONITORAMENTO',
            pergunta: 'O ciclo de vida do produto é rastreado através de sistemas tecnológicos e digitais',
            subtitulo: '(QR Code, Chip de Rastreamento, Passaporte Digital do Produto, etc.)',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Sim' },
                { valor: 2, label: 'Não' },
                { valor: 3, label: 'Não sei' }
            ],
            obrigatoria: true
        },
        
        // MONITORAMENTO - Q12
        {
            id: 12,
            categoria: 'MONITORAMENTO',
            pergunta: 'A documentação e as informações do produto são facilmente disponíveis e fáceis de entender para o consumidor final',
            subtitulo: '(materiais utilizados, certificações obtidas, etc.)',
            tipo: 'radio',
            opcoes: [
                { valor: 1, label: 'Sim' },
                { valor: 2, label: 'Não' },
                { valor: 3, label: 'Não sei' }
            ],
            obrigatoria: true
        }
    ],
    
    // Mapeamento das respostas para os nomes das colunas do banco
    MAPEAMENTO_RESPOSTAS: {
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
    }
};

