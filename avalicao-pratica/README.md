# Lista de Requisitos Funcionais ??
## 1. Autenticação de Usuários (Login)
- Sistema deve permitir login de usuários com username e senha
- Em caso de falha de autenticação, informar o motivo da falha
- Após falha, redirecionar novamente à tela de autenticação
- Sessão deve ser mantida durante navegação (cookies/JWT)

## 2. Interface Principal (Dashboard)
- Exibir nome do usuário logado
- Botão de logout que redireciona à tela de login
- Link de acesso à interface de cadastro de produtos
- Link de acesso à interface de gestão de estoque
- Design responsivo e intuitivo

## 3. Interface de Cadastro de Produtos
- Listar produtos cadastrados em tabela (carregamento automático)
- Campo de busca para filtrar produtos por nome, descrição ou categoria
- Formulário para inserção de novos produtos com validação
- Funcionalidade de edição de produtos existentes
- Funcionalidade de exclusão de produtos existentes
- Validações obrigatórias: nome, descrição, categoria, tamanho, peso, material, estoque mínimo, preço
- Campos obrigatórios devem ser validados antes do envio

## 4. Interface de Gestão de Estoque
- Listar produtos em ordem alfabética (algoritmo de ordenação implementado)
- Seleção de produto para movimentação
- Escolha entre entrada ou saída de estoque
- Campo para inserção da data da movimentação
- Verificação automática de estoque mínimo em saídas
- Alerta quando estoque ficar abaixo do mínimo configurado
- Registro de histórico de movimentações com responsável e data

## 5. Sistema de Alertas
- Alertas automáticos para produtos com estoque baixo
- Notificações visuais na interface de gestão de estoque
- Identificação clara de produtos com estoque crítico

## 6. Histórico e Rastreabilidade
- Registro completo de todas as movimentações de estoque
- Identificação do responsável por cada operação
- Registro da data/hora de cada movimentação
- Notas opcionais para contexto adicional

## 7. Validações de Dados
- Validação de campos obrigatórios em formulários
- Validação de tipos de dados (números, datas)
- Prevenção de estoque negativo
- Verificação de existência de produtos antes de operações

## 8. Segurança
- Autenticação obrigatória para todas as operações
- Proteção contra acesso não autorizado
- Sanitização de inputs para prevenir ataques
- Sessões seguras com expiração

## 9. Interface e Usabilidade
- Design responsivo para diferentes dispositivos
- Feedback visual para ações do usuário
- Mensagens de erro claras e específicas
- Navegação intuitiva entre interfaces
- Loading states durante operações assíncronas

## 10. Persistência de Dados
- Armazenamento de usuários, produtos e movimentações
- Relacionamentos entre entidades (usuários, produtos, movimentações)
- Integridade referencial mantida
- Backup e recuperação de dados


---

########### Descrição dos Testes de Software ###########

## Ambiente de Teste

* **Sistema Operacional**: Windows 11
* **Navegador**: Chrome 120+, Firefox 115+, Edge 120+
* **Banco de Dados**: MongoDB 7.0+
* **Node.js**: 18.0+
* **Framework**: Next.js 16.0, React 19.2

## Ferramentas de Teste

* **Teste Unitário**: Jest
* **Teste de Integração**: Cypress para testes E2E
* **Teste de API**: Postman/Insomnia para endpoints de API
* **Teste de Carga**: Artillery para testes de desempenho

## Casos de Teste de Requisitos Funcionais

### 1. Autenticação de Usuário (Interface de Login)

#### 1.1 Login Bem-Sucedido

* **ID do Caso de Teste**: AUTH_001
* **Descrição**: Verificar login bem-sucedido com credenciais válidas
* **Pré-condições**: Usuário administrador existente no banco de dados
* **Passos**:

  1. Acessar /login
  2. Inserir nome de usuário e senha válidos
  3. Clicar em "Entrar"
* **Resultado Esperado**: Redirecionar para o painel, exibindo o nome do usuário
* **Dados de Teste**: usuário: "admin", senha: "admin123"

#### 1.2 Falha no Login – Credenciais Inválidas

* **ID do Caso de Teste**: AUTH_002
* **Descrição**: Verificar exibição de mensagem de erro para credenciais inválidas
* **Pré-condições**: Nenhuma
* **Passos**:

  1. Acessar /login
  2. Inserir nome de usuário/senha inválidos
  3. Clicar em "Entrar"
* **Resultado Esperado**: Mensagem de erro exibida; permanecer na página de login
* **Dados de Teste**: usuário: "invalid", senha: "invalid"

#### 1.3 Falha no Login – Campos Vazios

* **ID do Caso de Teste**: AUTH_003
* **Descrição**: Verificar validação para campos vazios
* **Pré-condições**: Nenhuma
* **Passos**:

  1. Acessar /login
  2. Deixar os campos em branco
  3. Clicar em "Entrar"
* **Resultado Esperado**: Validação do navegador impede o envio do formulário

### 2. Interface do Painel Principal

#### 2.1 Exibir Nome do Usuário

* **ID do Caso de Teste**: DASH_001
* **Descrição**: Verificar se o nome do usuário logado é exibido
* **Pré-condições**: Usuário autenticado
* **Passos**:

  1. Fazer login com sucesso
  2. Verificar o cabeçalho do painel
* **Resultado Esperado**: Nome do usuário exibido no cabeçalho

#### 2.2 Funcionalidade de Logout

* **ID do Caso de Teste**: DASH_002
* **Descrição**: Verificar se o logout redireciona para a tela de login
* **Pré-condições**: Usuário autenticado
* **Passos**:

  1. Clicar no botão de logout
* **Resultado Esperado**: Redirecionamento para a página de login

#### 2.3 Navegação para Gerenciamento de Produtos

* **ID do Caso de Teste**: DASH_003
* **Descrição**: Verificar navegação para a página de produtos
* **Pré-condições**: Usuário autenticado
* **Passos**:

  1. Clicar no botão "Ir para Produtos"
* **Resultado Esperado**: Redirecionamento para /products

#### 2.4 Navegação para Gerenciamento de Estoque

* **ID do Caso de Teste**: DASH_004
* **Descrição**: Verificar navegação para a página de estoque
* **Pré-condições**: Usuário autenticado
* **Passos**:

  1. Clicar no botão "Ir para Estoque"
* **Resultado Esperado**: Redirecionamento para /stock

### 3. Interface de Cadastro de Produtos

#### 3.1 Listar Produtos

* **ID do Caso de Teste**: PROD_001
* **Descrição**: Verificar se os produtos são exibidos em formato de tabela
* **Pré-condições**: Produtos de exemplo existentes
* **Passos**:

  1. Acessar /products
* **Resultado Esperado**: Produtos exibidos em formato tabular

#### 3.2 Buscar Produtos

* **ID do Caso de Teste**: PROD_002
* **Descrição**: Verificar funcionalidade de busca
* **Pré-condições**: Múltiplos produtos cadastrados
* **Passos**:

  1. Inserir termo de busca
  2. Clicar em "Buscar" ou pressionar Enter
* **Resultado Esperado**: Apenas produtos correspondentes exibidos

#### 3.3 Adicionar Novo Produto – Sucesso

* **ID do Caso de Teste**: PROD_003
* **Descrição**: Verificar criação bem-sucedida de produto
* **Pré-condições**: Usuário autenticado
* **Passos**:

  1. Clicar em "Adicionar Produto"
  2. Preencher todos os campos obrigatórios
  3. Clicar em "Criar"
* **Resultado Esperado**: Produto adicionado à lista, mensagem de sucesso exibida

#### 3.4 Adicionar Novo Produto – Validação

* **ID do Caso de Teste**: PROD_004
* **Descrição**: Verificar validação do formulário
* **Pré-condições**: Usuário autenticado
* **Passos**:

  1. Clicar em "Adicionar Produto"
  2. Deixar campos obrigatórios vazios
  3. Clicar em "Criar"
* **Resultado Esperado**: Exibição de mensagens de erro de validação

#### 3.5 Editar Produto

* **ID do Caso de Teste**: PROD_005
* **Descrição**: Verificar edição de produto
* **Pré-condições**: Produto existente
* **Passos**:

  1. Clicar em "Editar" em um produto
  2. Modificar os campos desejados
  3. Clicar em "Atualizar"
* **Resultado Esperado**: Produto atualizado na lista

#### 3.6 Excluir Produto

* **ID do Caso de Teste**: PROD_006
* **Descrição**: Verificar exclusão de produto
* **Pré-condições**: Produto existente
* **Passos**:

  1. Clicar em "Excluir" em um produto
  2. Confirmar exclusão
* **Resultado Esperado**: Produto removido da lista

### 4. Interface de Gerenciamento de Estoque

#### 4.1 Exibir Produtos em Ordem Alfabética

* **ID do Caso de Teste**: STOCK_001
* **Descrição**: Verificar se os produtos são exibidos em ordem alfabética
* **Pré-condições**: Múltiplos produtos existentes
* **Passos**:

  1. Acessar /stock
* **Resultado Esperado**: Produtos exibidos em ordem alfabética

#### 4.2 Movimento de Entrada de Estoque

* **ID do Caso de Teste**: STOCK_002
* **Descrição**: Verificar se a entrada de estoque aumenta a quantidade
* **Pré-condições**: Produto existente
* **Passos**:

  1. Selecionar produto
  2. Escolher "Entrada"
  3. Informar quantidade e data
  4. Clicar em "Registrar Movimento"
* **Resultado Esperado**: Quantidade em estoque aumentada

#### 4.3 Movimento de Saída de Estoque – Sucesso

* **ID do Caso de Teste**: STOCK_003
* **Descrição**: Verificar se a saída de estoque reduz a quantidade
* **Pré-condições**: Produto com estoque suficiente
* **Passos**:

  1. Selecionar produto
  2. Escolher "Saída"
  3. Informar quantidade e data
  4. Clicar em "Registrar Movimento"
* **Resultado Esperado**: Quantidade em estoque reduzida

#### 4.4 Movimento de Saída – Estoque Insuficiente

* **ID do Caso de Teste**: STOCK_004
* **Descrição**: Verificar exibição de erro em caso de estoque insuficiente
* **Pré-condições**: Produto com baixo estoque
* **Passos**:

  1. Selecionar produto
  2. Escolher "Saída"
  3. Inserir quantidade maior que o estoque atual
  4. Clicar em "Registrar Movimento"
* **Resultado Esperado**: Exibição de mensagem de erro

#### 4.5 Alerta de Estoque Mínimo

* **ID do Caso de Teste**: STOCK_005
* **Descrição**: Verificar alerta quando o estoque atinge ou fica abaixo do mínimo
* **Pré-condições**: Produto próximo do estoque mínimo
* **Passos**:

  1. Realizar movimento de saída que reduza o estoque ao mínimo ou abaixo dele
* **Resultado Esperado**: Exibição de mensagem de alerta

## Casos de Teste Não Funcionais

### Testes de Desempenho

#### PERF_001: Tempo de Carregamento das Páginas

* **Descrição**: Verificar se as páginas carregam em até 2 segundos
* **Ferramentas**: Lighthouse, WebPageTest

#### PERF_002: Desempenho de Consultas ao Banco de Dados

* **Descrição**: Verificar se consultas ao banco de dados são concluídas em até 500ms
* **Ferramentas**: MongoDB Profiler

### Testes de Segurança

#### SEC_001: Bypass de Autenticação

* **Descrição**: Tentar acessar rotas protegidas sem autenticação
* **Resultado Esperado**: Redirecionamento para a página de login

#### SEC_002: Prevenção de Injeção SQL

* **Descrição**: Testar se a validação de entrada impede ataques de injeção
* **Ferramentas**: OWASP ZAP

### Testes de Usabilidade

#### USAB_001: Design Responsivo

* **Descrição**: Verificar se a interface funciona em dispositivos móveis, tablets e desktops
* **Ferramentas**: Ferramentas de desenvolvedor do navegador, verificadores de design responsivo

#### USAB_002: Acessibilidade

* **Descrição**: Verificar conformidade com as diretrizes WCAG
* **Ferramentas**: WAVE, axe-core

---

# Requisitos de Infraestrutura

## Sistema de Gerenciamento de Banco de Dados (SGBD)

* **Nome**: MongoDB
* **Versão**: 7.0 ou superior
* **Finalidade**: Banco de dados NoSQL orientado a documentos para armazenar dados de usuários, produtos e movimentações de estoque
* **Configuração**: Instalação padrão com autenticação habilitada

## Linguagem de Programação e Framework

* **Linguagem**: TypeScript
* **Versão**: 5.0 ou superior
* **Runtime**: Node.js
* **Versão**: 18.0 ou superior
* **Framework**: Next.js
* **Versão**: 16.0
* **Finalidade**: Framework full-stack baseado em React para desenvolvimento da aplicação web

## Sistema Operacional

* **Nome**: Windows
* **Versão**: Windows 11
* **Arquitetura**: 64 bits
* **Finalidade**: Ambiente de desenvolvimento e implantação

## Dependências Adicionais

* **Mongoose**: 8.0+ (ODM do MongoDB para Node.js)
* **bcryptjs**: 2.4.3+ (Hashing de senhas)
* **jsonwebtoken**: 9.0.2+ (Autenticação via JWT)
* **Tailwind CSS**: 4.0+ (Framework CSS)
* **React**: 19.2.0 (Biblioteca de interface de usuário)
* **React DOM**: 19.2.0 (Renderização do React)

## Requisitos de Hardware

* **Memória RAM**: Mínimo 8GB, recomendado 16GB
* **Armazenamento**: Mínimo 10GB de espaço livre
* **Processador**: Intel i5 ou equivalente (mínimo 4 núcleos)

## Requisitos de Rede

* **Conexão com a Internet**: Necessária para instalação de pacotes npm
* **Conexão com Banco de Dados**: Instância local do MongoDB ou MongoDB Atlas na nuvem
* **Portas**: 3000 (servidor de desenvolvimento do Next.js), 27017 (porta padrão do MongoDB)

## Ferramentas de Desenvolvimento

* **Editor de Código**: Visual Studio Code (recomendado)
* **Controle de Versão**: Git
* **Gerenciador de Pacotes**: npm ou yarn
* **Navegador**: Chrome 120+, Firefox 115+, Edge 120+ (para testes)

## Considerações de Implantação

* **Banco de Dados em Produção**: MongoDB Atlas ou instância autogerenciada do MongoDB
* **Variáveis de Ambiente**:

  * `MONGODB_URI`: String de conexão com o banco de dados
  * `JWT_SECRET`: Chave secreta para geração de tokens JWT
  * `NODE_ENV`: Modo de ambiente (desenvolvimento/produção)
* **Processo de Build**: Comando de build do Next.js para implantação em produção
* **Servidor Web**: Vercel, Netlify ou servidor Node.js para hospedagem

---


# Diagrama Entidade-Relacionamento (DER)

## Entidades

### 1. Usuário (User)

* **userId**: ObjectId (Chave Primária)
* **username**: String (Único, Obrigatório)
* **password**: String (Obrigatório, Criptografado)
* **name**: String (Obrigatório)
* **role**: String (Enum: 'admin', 'user', Padrão: 'user')
* **createdAt**: Date
* **updatedAt**: Date

### 2. Produto (Product)

* **productId**: ObjectId (Chave Primária)
* **name**: String (Obrigatório)
* **description**: String (Obrigatório)
* **category**: String (Obrigatório)
* **size**: String (Obrigatório)
* **weight**: Number (Obrigatório)
* **material**: String (Obrigatório)
* **currentStock**: Number (Padrão: 0)
* **minStock**: Number (Obrigatório)
* **price**: Number (Obrigatório)
* **createdAt**: Date
* **updatedAt**: Date

### 3. Movimentação de Estoque (StockMovement)

* **movementId**: ObjectId (Chave Primária)
* **product**: ObjectId (Chave Estrangeira → Product.productId)
* **type**: String (Enum: 'entrada', 'saida', Obrigatório)
* **quantity**: Number (Obrigatório)
* **date**: Date (Obrigatório)
* **responsible**: ObjectId (Chave Estrangeira → User.userId)
* **notes**: String (Opcional)
* **createdAt**: Date
* **updatedAt**: Date

## Relacionamentos

### Usuário → Movimentação de Estoque

* **Tipo**: 1:N (Um para Muitos)
* **Descrição**: Um usuário pode registrar várias movimentações de estoque
* **Cardinalidade**: 1 usuário → N movimentações
* **Implementação**: `StockMovement.responsible` referencia `User.userId`

### Produto → Movimentação de Estoque

* **Tipo**: 1:N (Um para Muitos)
* **Descrição**: Um produto pode ter várias movimentações de estoque
* **Cardinalidade**: 1 produto → N movimentações
* **Implementação**: `StockMovement.product` referencia `Product.productId`

## Regras de Integridade

### 1. Restrições de Domínio

* **User.username**: Deve ser único no sistema
* **User.role**: Deve conter apenas os valores 'admin' ou 'user'
* **Product.currentStock**: Não pode ser negativo
* **Product.minStock**: Deve ser ≥ 0
* **Product.price**: Deve ser > 0
* **StockMovement.type**: Apenas 'entrada' ou 'saida'
* **StockMovement.quantity**: Deve ser > 0

### 2. Regras de Negócio

* **Estoque Atual**: Calculado dinamicamente com base nas movimentações
* **Alerta de Estoque Mínimo**: Quando `Product.currentStock <= Product.minStock`
* **Movimentação de Saída**: Não pode exceder o estoque atual
* **Auditoria**: Todas as movimentações são registradas com responsável e data

## Diagrama Textual

```
┌─────────────────┐       ┌─────────────────┐
│     Usuário     │       │ Movimentação    │
├─────────────────┤       ├─────────────────┤
│ userId (PK)     │◄──────┤ movementId (PK) │
│ username        │       │ product (FK)    │
│ password        │       │ type            │
│ name            │       │ quantity        │
│ role            │       │ date            │
│ createdAt       │       │ responsible (FK)│
│ updatedAt       │       │ notes           │
└─────────────────┘       │ createdAt       │
                          │ updatedAt       │
                          └─────────────────┘
                                 │
                                 │
                                 ▼
                         ┌─────────────────┐
                         │     Produto     │
                         ├─────────────────┤
                         │ productId (PK)  │
                         │ name            │
                         │ description     │
                         │ category        │
                         │ size            │
                         │ weight          │
                         │ material        │
                         │ currentStock    │
                         │ minStock        │
                         │ price           │
                         │ createdAt       │
                         │ updatedAt       │
                         └─────────────────┘
```

## Índices Recomendados

### Usuário

* `username` (único)
* `role`

### Produto

* `name` (para buscas)
* `category`
* `currentStock + minStock` (para alertas)

### Movimentação de Estoque

* `product + date` (para histórico por produto)
* `responsible + date` (para auditoria)
* `type + date` (para relatórios)

## Considerações de Desempenho

1. **Paginação**: Implementar paginação em listagens extensas
2. **Índices Compostos**: Utilizar em consultas frequentes (`product + date`)
3. **Cache**: Considerar cache para produtos mais acessados
4. **Agregações**: Utilizar o *aggregation pipeline* do MongoDB para relatórios

---

