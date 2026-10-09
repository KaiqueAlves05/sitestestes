# PRD — Mundinho 🎀

## Problema original
Criar um site-presente em pt-BR para uma pessoa que está em fase de conexão/conhecimento mútuo (crush energy, sem declaração de relacionamento). Clima: leve, fofo, divertido, sem pressão. Textos fornecidos pelo usuário devem aparecer exatamente como enviados (hero, multiverso, Hello Kitty, Dexter, gatinhos, descobertas, carta, surpresa final com dois botões de resposta).

## Decisões do usuário (via ask_human)
- Visual: rosa fofo + toques de céu estrelado (Hello Kitty + Rick and Morty convivendo)
- Navegação: página única que desce como uma história
- Sons: pequenos efeitos sonoros fofos (Web Audio API, com botão de mudo)
- Sem nome citado (anônimo e charmoso)
- Extra: "faça como se tivesse um mini game" → mini game dos gatinhos com Fofurômetro

## Arquitetura
- Frontend React (Create React App + craco) em /app/frontend, Tailwind + framer-motion + lenis (scroll suave) + sonner (toasts)
- Site 100% frontend/estático; backend FastAPI intocado (não há necessidade de API)
- Sons sintetizados via Web Audio API (src/lib/sounds.js) — sem arquivos de áudio externos
- SVGs autorais: laço (logo/favicon), gatinha estilo Hello Kitty, 3 gatinhos do jogo, corações, estrelas
- Fontes: Fredoka (títulos), Plus Jakarta Sans (corpo), Caveat (manuscrito), Space Mono (etiquetas)
- Paleta: paper #FFF5F7 / ink #4A1F3D / candy #EC4899 / cosmic #100E1E / gold #FBBF24 / portal #10B981 / cream #FFF8EF

## Seções implementadas (2026-10-09)
1. Hero cósmico — título com reveal mascarado linha a linha, gatinha com laço em 3D tilt (mouse), parallax de estrelas, CTA "Tá curiosa? Clica aqui 👀"
2. Marquee editorial dourada (faixa de recadinhos)
3. Multiverso — portal verde giratório, citação exata, botão "Explorar outra dimensão 🪐" com transição de portal em tela cheia + som de whoosh
4. Cantinho Hello Kitty — 3 cartões flip com mensagens escondidas, laços e corações flutuantes
5. Mistério de Dexter — terminal de laboratório, scan com linhas digitadas e barra de progresso, laudo: "Investigação inconclusiva. A principal suspeita é esse seu jeitinho."
6. MINI GAME Cantinho dos Gatinhos — 3 gatinhos (Pudim, Miau Estelar, Frufru), carinho → miado sintetizado + explosão de corações + elogios em balão; Fofurômetro 0/9 → badge "Master do Carinho" + toast
7. Bento "Coisas que estou descobrindo sobre você" — 5 frases exatas em grid assimétrico com hover
8. Carta — envelope com selo de cera pulsante; ao clicar abre carta manuscrita (texto exato)
9. Final — "Antes de você ir... 💌", botão "Uma última surpresa 🎁" → chuva de corações/estrelas/gatinhas/laços + fanfarra; mensagem final exata; botões "Achei fofo 🥹💕" e "Você é meio bobinho KKKKK 🤭" com respostas rotativas diferentes + som

## Pessoas
- Ela (destinatária): navegada no celular, toca em tudo, adora Hello Kitty e gatinhos
- Ele (autor): presenteou; quer arrancar um sorriso sem exagero emocional

## Backlog priorizado
- P1: personalizar com nome/apelido dela (fácil: Hero + carta)
- P1: contador de visitas/reações (se quiser backend depois)
- P2: música de fundo ambiente com toggle
- P2: easter egg no portal (aparecer frase extra após 3 cliques)
- P2: opção de "fotos nossas" na seção da carta

## Próximos passos
- Adicionar nome dela no hero/carta quando o usuário informar
- Ajustes de tom/texto que o usuário quiser após rever
