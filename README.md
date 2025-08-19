# Mini Console do Vendedor

## 🚀 Objetivo
Um console leve para triagem de leads e conversão em oportunidades, construído em **React + Vite + Tailwind**.

---

## 📂 Estrutura do Projeto
```
mini-console-vendedor/
│── public/
│   └── leads.json        # Base de dados local de leads
│── src/
│   ├── components/       # Componentes reutilizáveis
│   │   ├── LeadList.tsx
│   │   ├── LeadDetails.tsx
│   │   └── Opportunities.tsx
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Ponto de entrada do React
│   └── index.css         # Estilos globais (Tailwind)
│── package.json
│── vite.config.ts
│── tailwind.config.js
│── README.md
```

---

## 📋 Funcionalidades
1. **Lista de Leads**
   - Carregada de `public/leads.json`
   - Pesquisar (nome/empresa)
   - Filtrar (status)
   - Ordenar (pontuação)

2. **Painel de Detalhes**
   - Abrir painel lateral ao clicar em um lead
   - Editar e-mail (validação)
   - Alterar status
   - Ações de salvar/cancelar

3. **Conversão em Oportunidade**
   - Botão "Converter Lead"
   - Criação de oportunidade com: `id, nome, etapa, valor, accountName`
   - Listagem em tabela

4. **UX/Estados**
   - Loading, erro e vazio
   - Suporte a ~100 leads

---

## ⚡ Pontos Positivos Implementados
- Persistência de filtros e ordenação com **localStorage**
- Atualizações otimistas com rollback em caso de erro simulado
- Layout responsivo (desktop e mobile)

---

## ▶️ Como Rodar
```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build de produção
npm run build
```

---

## 📌 Tecnologias
- **React (Vite)**
- **TailwindCSS**
- **TypeScript**
- **Simulação de API com JSON local**
