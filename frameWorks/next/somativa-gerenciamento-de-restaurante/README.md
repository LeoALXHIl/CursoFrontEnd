# Sistema de Gestão de Manutenção (Formativa)

# Briefing

## Visão Geral do Projeto
O projeto consiste no desenvolvimento de um Sistema de Gestão de Manutenção (SGM) no formato de uma aplicação web. O objetivo é centralizar e otimizar o controle das atividades de manutenção de máquinas e equipamentos de uma empresa. A plataforma permitirá o cadastro de equipamentos, agendamento de manutenções preventivas e corretivas, e o gerenciamento de ordens de serviço.


## Escopo

- ### Objetivos:
    - Centralizar Informações: Unificar os dados sobre equipamentos e manutenções em um único local.
    - Otimizar Processos: Agilizar a abertura, atribuição e finalização de ordens de serviço.
    - Melhorar a Tomada de Decisão: Fornecer um histórico detalhado de manutenções por equipamento para análises futuras.
    - Aumentar a Produtividade: Reduzir o tempo de inatividade dos equipamentos através de um gerenciamento mais eficaz.
    - Garantir a Segurança: Proteger o acesso e os dados do sistema com autenticação moderna e segura.

- ### Público-Alvo:
    - Técnicos de Manutenção: Responsáveis pela execução e atualização das ordens de serviço.
    - Gestores de Manutenção: Encarregados de planejar, delegar e supervisionar as atividades de manutenção.
    - Administradores do Sistema: Responsáveis pela gestão de usuários e permissões.

- ### Recursos Tecnológicos:

# Sistema de Gestão de Pedidos - Bistrô Sabor Local

Este repositório contém uma aplicação Full-Stack (Next.js + MongoDB) com foco em um Sistema de Gestão de Pedidos para restaurante, desenvolvido como exercício formativo/avaliação.

Cliente Fictício
-----------------
Bistrô Sabor Local

Visão Geral / O Problema
------------------------
Atualmente os pedidos são anotados em papel e levados até a cozinha. O papel pode se perder, a letra ser ilegível e a cozinha não sabe a ordem de chegada — resultando em atrasos, desperdício e clientes insatisfeitos.

Público-alvo (Perfis)
----------------------
- Gerente: cadastra/edita itens do cardápio, visualiza todos os pedidos e o faturamento.
- Garçom: cria novos pedidos, adiciona itens ao pedido e envia para a cozinha.

Escopo mínimo (MVP) — Requisitos essenciais
-------------------------------------------
1. CRUD para Itens do Cardápio
     - Campos: nome, preço, categoria (ex.: entrada, prato principal, sobremesa, bebida).
2. Sistema para criar Pedidos
     - Associar pedido a um número de mesa
     - Adicionar vários itens do cardápio (quantidade por item)
3. Status do pedido
     - Recebido, Em Preparo, Entregue
4. Tela "Cozinha"
     - Mostra pedidos com status "Recebido" ordenados por data/hora de criação (ordem de chegada)

Diferencial sugerido (Bônus)
----------------------------
- Cálculo automático do valor total do pedido.
- Funcionalidade de "Fechar a conta" (gerar conta/fatura e marcar pedido como encerrado).

Stack técnico e técnicas
------------------------
- Frontend / Fullstack: Next.js (App Router)
- Banco de dados: MongoDB com Mongoose
- APIs: RESTful endpoints seguros
- Auth: Autenticação e autorização por papéis usando JWT
- Estilos: SCSS com arquitetura modular

Modelagem de Dados (visão rápida)
--------------------------------
- MenuItem (Cardápio)
    - id (ObjectId)
    - name: String
    - price: Number (em centavos ou float — recomenda-se centavos/integer para evitar problemas com float)
    - category: String
    - createdAt, updatedAt

- User
    - id (ObjectId)
    - name: String
    - email: String
    - passwordHash: String
    - role: String ("manager" | "waiter")

- Order
    - id (ObjectId)
    - tableNumber: Number | String
    - items: [{ menuItem: ObjectId, name: String, unitPrice: Number, quantity: Number }]
    - status: String ("Recebido" | "Em Preparo" | "Entregue")
    - total: Number (calculado)
    - createdAt, updatedAt

Exemplo simplificado (JSON) — criação de pedido

{
    "tableNumber": 12,
    "items": [
        { "menuItem": "64aa...", "quantity": 2 },
        { "menuItem": "64bb...", "quantity": 1 }
    ]
}

APIs / Endpoints (sugestão)
---------------------------
- Autenticação
    - POST /api/auth/login — recebe email/senha, retorna JWT

- Itens do Cardápio
    - GET /api/menu — lista itens
    - POST /api/menu — cria item (role: manager)
    - GET /api/menu/:id — pega item
    - PUT /api/menu/:id — atualiza item (role: manager)
    - DELETE /api/menu/:id — remove item (role: manager)

- Pedidos
    - POST /api/orders — cria pedido (role: waiter)
    - GET /api/orders — lista pedidos (role: manager/manager+waiter com filtros)
    - GET /api/orders/:id — detalhe
    - PATCH /api/orders/:id/status — atualiza status (Ex.: Recebido -> Em Preparo -> Entregue)

- Tela Cozinha
    - GET /api/orders?status=Recebido&sort=createdAt — endpoint que alimenta a tela da cozinha

Autenticação e Autorização
--------------------------
- JWT para autenticação: o servidor emite um token no login que o cliente armazena (localStorage ou cookie httpOnly).
- Roles básicas: "manager" e "waiter". Middleware verifica token e role antes de permitir ações protegidas.

Considerações de segurança
-------------------------
- Nunca armazenar senhas em texto — usar bcrypt/argon2 para hashes.
- Proteger rotas sensíveis com verificação de JWT e checagem de role.
- Proteger secrets com variáveis de ambiente (ex.: JWT_SECRET, MONGODB_URI).

Como rodar localmente
---------------------
1. Copie o repositório e instale dependências:

```powershell
npm install
```

2. Variáveis de ambiente necessárias (exemplo `.env.local`):

- MONGODB_URI=mongodb://localhost:27017/somativa-pedidos
- JWT_SECRET=uma_senha_secreta_complexa_aqui
- NEXT_PUBLIC_API_URL=http://localhost:3000

3. Rodar em modo de desenvolvimento:

```powershell
npm run dev
```

Observações
-----------
- Recomenda-se usar o formato inteiro (centavos) para armazenar preços para evitar problemas com aritmética de ponto flutuante.
- A coleção `Order` armazena um snapshot do nome e preço unitário do MenuItem no momento do pedido (denormalização) para preservar histórico mesmo que o cardápio mude.

Testes rápidos / Smoke tests
---------------------------
- Criar um usuário manager direto no banco (ou via seed) e logar.
- Criar alguns itens do cardápio.
- Criar um pedido como waiter e confirmar que aparece em GET /api/orders?status=Recebido.

Casos de borda e validações importantes
--------------------------------------
- Verificar estoque/quantidade (se aplicável) antes de confirmar pedido.
- Validar tableNumber, itens não vazios e quantidades >= 1.
- Evitar Race conditions na cozinha: marcar tempo de atualização/locks simples se necessário.

Melhorias futuras
------------------
- Paginação e filtros para listagem de pedidos.
- Notificações em tempo real (WebSockets / SSE) para a cozinha quando um novo pedido chegar.


Mapeamento dos requisitos (coverage)
-----------------------------------
- CRUD Itens do Cardápio: Done (especificado) (feito)
- Criar Pedidos com número de mesa e itens: Done (feito)
- Status do pedido: Done (Recebido, Em Preparo, Entregue) (feito)
- Tela Cozinha ordenada por chegada: Done (endpoint sugerido) (feito)
- Bônus (Total e Fechar conta): Sugerido e documentado (feito)

Contato / Apresentação
----------------------
Este README foi adaptado ao briefing do Bistrô Sabor Local. Se quiser, eu também posso:

- Gerar esquemas Mongoose completos (`models/MenuItem.js`, `models/Order.js`, `models/User.js`).
- Implementar os endpoints REST básicos com validação e testes.
- Criar uma seed para popular o banco com usuários e itens de exemplo.

---

Arquivo original: este repositório contém também código base com Next.js (App Router) e utilitários em `lib/` — verifique `lib/db.js` e `lib/auth.js` para integrar a autenticação e a conexão ao MongoDB.


