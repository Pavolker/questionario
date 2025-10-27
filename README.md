# Questionário de Circularidade - CosmoBrasil

## 📋 Descrição

Aplicativo web para coleta de dados sobre economia circular através de questionário com 12 questões, baseado na metodologia do Centro Tecnológico Cosmob da Itália.

## 🗂️ Estrutura de Arquivos

```
questionario/
├── index.html              # Estrutura HTML principal
├── config.js               # Configuração das questões e Supabase
├── app.js                  # Lógica da aplicação
├── style.css               # Estilos adicionais
├── supabase-tables.sql     # Script SQL para criação das tabelas
└── README.md               # Este arquivo
```

## 🚀 Como Usar

### 1. Configurar Supabase

1. Acesse seu projeto no Supabase
2. Execute o arquivo `supabase-tables.sql` no SQL Editor
3. Copie a URL e a chave anônima (anon key)
4. Atualize em `config.js`:

```javascript
SUPABASE_URL: 'https://seu-projeto.supabase.co',
SUPABASE_ANON_KEY: 'sua_anon_key_aqui'
```

### 2. Executar Localmente

```bash
# Abrir com servidor local
python3 -m http.server 8000

# Acessar
http://localhost:8000/questionario/
```

### 3. Deploy

O aplicativo está pronto para deploy no Netlify, Vercel ou qualquer plataforma de hospedagem estática.

## 📊 Fluxo da Aplicação

1. **Tela de Termos de Uso**
   - Apresentação do pré-diagnóstico
   - Termos e condições
   - Botão de aceite obrigatório

2. **Dados de Identificação**
   - Nome da empresa
   - CNPJ
   - Nome do responsável
   - E-mail
   - Setor econômico
   - Produto avaliado

3. **Questionário (12 Questões)**
   - ENTRADA (Input) - Q1
   - GESTÃO DE RESÍDUOS - Q2
   - SAÍDA DO PRODUTO - Q3 a Q6
   - VIDA DO PRODUTO - Q7 a Q9
   - MONITORAMENTO - Q10 a Q12

4. **Tela de Confirmação**
   - Confirmação de conclusão
   - Próximos passos

## 🗄️ Estrutura de Dados

### Tabela: `empresas`
- id (UUID)
- nome_empresa
- cnpj
- nome_responsavel
- email
- setor_economico
- produto_avaliado

### Tabela: `questionarios`
- id (UUID)
- empresa_id (FK)
- materia_prima (Q1)
- residuos (Q2)
- desmonte (Q3)
- descarte (Q4)
- recuperacao (Q5)
- reciclagem (Q6)
- durabilidade (Q7)
- reparavel (Q8)
- reaproveitavel (Q9)
- ciclo_estendido (Q10)
- ciclo_rastreado (Q11)
- documentacao (Q12)
- Campos calculados: soma, índices

## 🔧 Próximos Passos

1. **Integrar Supabase Client**
   - Adicionar biblioteca `@supabase/supabase-js`
   - Implementar salvamento de dados
   - Criar funções de RPC para cálculos

2. **Melhorias de UX**
   - Validação de campos em tempo real
   - Feedback visual durante salvamento
   - Histórico de questionários

3. **Recursos Adicionais**
   - Pré-visualização de resultados
   - Exportação de relatório
   - Dashboard individual

## 📝 Licença

© 2025 CosmoBrasil - Centro Tecnológico de Economia Circular

