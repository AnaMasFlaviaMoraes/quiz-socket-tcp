const net = require('net');

const PORT = 10000;
const ADDRESS = '127.0.0.1';
const POINTS_TO_WIN = 30;

const perguntasOriginais = [
  { 
    enunciado: "Qual civilização antiga construiu as pirâmides de Gizé?",
    alternativas: { A: "Mesopotâmica", B: "Egípcia", C: "Persa", D: "Romana" },
    correta: "B"
  },
  { 
    enunciado: "Quem foi o primeiro imperador de Roma?",
    alternativas: { A: "Augusto", B: "Nero", C: "Calígula", D: "Júlio César" },
    correta: "A"
  },
  { 
    enunciado: "Em que ano ocorreu a queda do Império Romano do Ocidente?",
    alternativas: { A: "476", B: "632", C: "800", D: "1453" },
    correta: "A"
  },
  { 
    enunciado: "Qual navegação marcou o início da Era dos Descobrimentos?",
    alternativas: { A: "Viagem de Colombo", B: "Circum-navegação de Magalhães", C: "Viagem de Vasco da Gama à Índia", D: "Travessia de Cabral ao Brasil" },
    correta: "C"
  },
  { 
    enunciado: "Quem pintou o teto da Capela Sistina?",
    alternativas: { A: "Da Vinci", B: "Michelangelo", C: "Rafael", D: "Donatello" },
    correta: "B"
  },
  { 
    enunciado: "Quem foi o líder da Revolução Russa de 1917?",
    alternativas: { A: "Stalin", B: "Trotsky", C: "Lênin", D: "Gorbachev" },
    correta: "C"
  },
  { 
    enunciado: "Em que ano começou a Primeira Guerra Mundial?",
    alternativas: { A: "1912", B: "1914", C: "1918", D: "1920" },
    correta: "B"
  },
  { 
    enunciado: "Em que ano terminou a Segunda Guerra Mundial?",
    alternativas: { A: "1942", B: "1944", C: "1945", D: "1950" },
    correta: "C"
  },
  { 
    enunciado: "Quem era o líder da Alemanha nazista?",
    alternativas: { A: "Hitler", B: "Mussolini", C: "Stalin", D: "Churchill" },
    correta: "A"
  },
  { 
    enunciado: "Qual foi o primeiro país a enviar um homem ao espaço?",
    alternativas: { A: "EUA", B: "URSS", C: "China", D: "Alemanha" },
    correta: "B"
  },
  { 
    enunciado: "Quem foi o primeiro homem a pisar na Lua?",
    alternativas: { A: "Neil Armstrong", B: "Buzz Aldrin", C: "Yuri Gagarin", D: "Michael Collins" },
    correta: "A"
  },
  { 
    enunciado: "A Revolução Francesa começou em qual ano?",
    alternativas: { A: "1789", B: "1798", C: "1804", D: "1776" },
    correta: "A"
  },
  { 
    enunciado: "Qual era o nome da rota comercial entre Europa e Ásia antes da modernidade?",
    alternativas: { A: "Rota Atlântica", B: "Rota da Seda", C: "Rota das Índias", D: "Rota Mediterrânea" },
    correta: "B"
  },
  { 
    enunciado: "Quem unificou a China sob o primeiro império?",
    alternativas: { A: "Confúcio", B: "Qin Shi Huang", C: "Gengis Khan", D: "Sun Tzu" },
    correta: "B"
  },
  {
    enunciado: "O muro de Berlim caiu em que ano?",
    alternativas: { A: "1985", B: "1987", C: "1989", D: "1991" },
    correta: "C"
  },
  {
    enunciado: "Quem descobriu o Brasil em 1500?",
    alternativas: { A: "Cristóvão Colombo", B: "Vasco da Gama", C: "Pedro Álvares Cabral", D: "Amerigo Vespucci" },
    correta: "C"
  },
  {
    enunciado: "Qual acontecimento marcou o início da Idade Média?",
    alternativas: { A: "Queda de Constantinopla", B: "Queda do Império Romano do Ocidente", C: "Descobrimento da América", D: "Reforma Protestante" },
    correta: "B"
  },
  {
    enunciado: "Quem foi o maior conquistador da Mongólia?",
    alternativas: { A: "Kublai Khan", B: "Gengis Khan", C: "Tamerlão", D: "Attila" },
    correta: "B"
  },
  {
    enunciado: "Que civilização construiu Machu Picchu?",
    alternativas: { A: "Asteca", B: "Inca", C: "Maia", D: "Olmeca" },
    correta: "B"
  },
  {
    enunciado: "Qual país foi o principal centro do Renascimento?",
    alternativas: { A: "França", B: "Alemanha", C: "Itália", D: "Espanha" },
    correta: "C"
  },
  {
    enunciado: "Quem foi o responsável pela Teoria da Relatividade?",
    alternativas: { A: "Newton", B: "Tesla", C: "Galileu", D: "Einstein" },
    correta: "D"
  },
  {
    enunciado: "Qual foi o principal líder da independência da Índia?",
    alternativas: { A: "Mandela", B: "Gandhi", C: "Nehru", D: "Bose" },
    correta: "B"
  },
  {
    enunciado: "Em que país ocorreu a Guerra dos Cem Anos?",
    alternativas: { A: "Itália e França", B: "França e Inglaterra", C: "Alemanha e Rússia", D: "Portugal e Espanha" },
    correta: "B"
  },
  {
    enunciado: "Quem foi o autor de 'O Príncipe'?",
    alternativas: { A: "Voltaire", B: "Maquiavel", C: "Rousseau", D: "Montesquieu" },
    correta: "B"
  },
  {
    enunciado: "Quem foi o imperador francês que tentou conquistar a Europa no século XIX?",
    alternativas: { A: "Luís XIV", B: "Luís XVI", C: "Napoleão Bonaparte", D: "Richelieu" },
    correta: "C"
  },
  {
    enunciado: "Qual evento desencadeou a Primeira Guerra Mundial?",
    alternativas: { A: "Invasão da Polônia", B: "Assassinato do Arquiduque Francisco Ferdinando", C: "Ataque a Pearl Harbor", D: "Revolução Russa" },
    correta: "B"
  },
  {
    enunciado: "Quem comandou a Marcha do Sal na Índia?",
    alternativas: { A: "Gandhi", B: "Nehru", C: "Tagore", D: "Azad" },
    correta: "A"
  },
  {
    enunciado: "A Guerra Fria foi um conflito entre quais países?",
    alternativas: { A: "China e Japão", B: "EUA e URSS", C: "França e Alemanha", D: "Índia e Paquistão" },
    correta: "B"
  },
  {
    enunciado: "Quem escreveu 'A Arte da Guerra'?",
    alternativas: { A: "Sun Tzu", B: "Confúcio", C: "Lao Tsé", D: "Mêncio" },
    correta: "A"
  },
  {
    enunciado: "Qual país iniciou a construção da Grande Muralha?",
    alternativas: { A: "Japão", B: "China", C: "Coreia", D: "Mongólia" },
    correta: "B"
  },
  {
    enunciado: "Quem foi o primeiro presidente dos Estados Unidos?",
    alternativas: { A: "Lincoln", B: "Jefferson", C: "Washington", D: "Franklin" },
    correta: "C"
  },
  {
    enunciado: "Em que ano o homem chegou à Lua?",
    alternativas: { A: "1965", B: "1969", C: "1971", D: "1975" },
    correta: "B"
  },
  {
    enunciado: "Quem liderou a unificação da Alemanha no século XIX?",
    alternativas: { A: "Hitler", B: "Kaiser Wilhelm II", C: "Bismarck", D: "Frederico II" },
    correta: "C"
  },
  {
    enunciado: "O que marcou o fim da Idade Média?",
    alternativas: { A: "Queda de Constantinopla", B: "Descobrimento da América", C: "Revolução Francesa", D: "Reforma Protestante" },
    correta: "A"
  },
  {
    enunciado: "Quem foi o grande explorador que liderou a primeira viagem ao redor do mundo?",
    alternativas: { A: "Magalhães", B: "Drake", C: "Colombo", D: "Cabral" },
    correta: "A"
  },
  {
    enunciado: "Qual civilização inventou a escrita cuneiforme?",
    alternativas: { A: "Suméria", B: "Egípcia", C: "Persa", D: "Grega" },
    correta: "A"
  },
  {
    enunciado: "Quem foi o filósofo que ensinou Aristóteles?",
    alternativas: { A: "Sócrates", B: "Platão", C: "Heráclito", D: "Demócrito" },
    correta: "B"
  },
  {
    enunciado: "Qual guerra envolveu Atenas e Esparta?",
    alternativas: { A: "Guerra do Peloponeso", B: "Guerra Médica", C: "Guerra Púnica", D: "Guerra de Tróia" },
    correta: "A"
  },
  {
    enunciado: "Quem foi o líder religioso que iniciou a Reforma Protestante?",
    alternativas: { A: "Calvino", B: "Martinho Lutero", C: "Zwinglio", D: "Knox" },
    correta: "B"
  },
  {
    enunciado: "Qual império caiu em 1453?",
    alternativas: { A: "Romano", B: "Bizantino", C: "Otomano", D: "Persa" },
    correta: "B"
  },
  {
    enunciado: "Quem foi o primeiro faraó do Egito unificado?",
    alternativas: { A: "Ramsés II", B: "Tutancâmon", C: "Menes", D: "Cleópatra" },
    correta: "C"
  },
  {
    enunciado: "Qual navegação levou ao descobrimento da América?",
    alternativas: { A: "Vasco da Gama", B: "Colombo", C: "Cabral", D: "Magalhães" },
    correta: "B"
  },
  {
    enunciado: "Em que país ocorreu a Revolução Industrial?",
    alternativas: { A: "França", B: "Alemanha", C: "Inglaterra", D: "Espanha" },
    correta: "C"
  },
  {
    enunciado: "Quem escreveu 'O Contrato Social'?",
    alternativas: { A: "Voltaire", B: "Rousseau", C: "Hobbes", D: "Locke" },
    correta: "B"
  },
  {
    enunciado: "Que império foi governado por Ciro, o Grande?",
    alternativas: { A: "Egípcio", B: "Persa", C: "Grego", D: "Romano" },
    correta: "B"
  },
  {
    enunciado: "Quem foi o líder sul-africano que lutou contra o apartheid?",
    alternativas: { A: "Mandela", B: "Gandhi", C: "Lumumba", D: "Nyerere" },
    correta: "A"
  },
  {
    enunciado: "Qual civilização construiu Teotihuacán?",
    alternativas: { A: "Maias", B: "Astecas", C: "Toltecas", D: "Olmecas" },
    correta: "C"
  },
  {
    enunciado: "Quem foi a rainha do Egito famosa por sua relação com Júlio César?",
    alternativas: { A: "Nefertiti", B: "Cleópatra", C: "Hatshepsut", D: "Tiy" },
    correta: "B"
  },
  {
    enunciado: "Em qual cidade começou a democracia antiga?",
    alternativas: { A: "Esparta", B: "Roma", C: "Atenas", D: "Corinto" },
    correta: "C"
  },
  {
    enunciado: "Qual império construiu a cidade de Tenochtitlán?",
    alternativas: { A: "Inca", B: "Asteca", C: "Maia", D: "Tolteca" },
    correta: "B"
  }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function cloneQuestions() {
  // retorna uma cópia embaralhada do banco original
  const pool = perguntasOriginais.map(q => ({ ...q, alternativas: { ...q.alternativas } }));
  shuffle(pool);
  return pool;
}

// --- estado do servidor / jogo ---
let waitingPlayers = []; // sockets aguardando (até 2)
let lobby = []; // objetos { socket, nick, id }
let gameActive = false;

let questionPool = [];
let currentQuestion = null;
let roundState = null; 

function resetRoundState() {
  roundState = {
    respostas: [null, null],
    ordem: []
  };
}

// envia string para um socket + newline
function send(sock, msg) {
  if (!sock || sock.destroyed) return;
  sock.write(msg + '\n');
}

function broadcast(msg) {
  lobby.forEach(p => send(p.socket, msg));
}

const server = net.createServer();


server.on('connection', socket => {
    socket.setEncoding('utf8');
    console.log('Conexão recebida de', socket.remoteAddress + ':' + socket.remotePort);
    send(socket, 'Bem-vindo! Envie seu NickName para participar do BATTLE QUIZ:');

    waitingPlayers.push(socket);

    socket.on('data', (raw) => {
        const texto = raw.toString().trim();

        // Se já estivermos com 2 jogadores no lobby, tratamos como mensagens do jogo
        if (lobby.length === 2 && gameActive) {
            handleGameMessage(socket, texto);
            return;
        }

        // Se o jogador ainda não enviou nick e lobby < 2
        if (lobby.find(p => p.socket === socket)) {
            // se já registrado, mas o game ainda não começou (aguardando 2º)
            send(socket, 'Aguardando o outro jogador...');
            return;
        }

        // Registrar nickname e mover para lobby
        const nick = texto || ('Player' + Math.floor(Math.random() * 1000));
        const playerId = lobby.length;
        lobby.push({ socket, nick, id: playerId, pontos: 0, ready: false })
        // remover de waitingPlayers
        waitingPlayers = waitingPlayers.filter(s => s !== socket);

        send(socket, 'Cliente Aceito para o BATTLE QUIZ');
        send(socket, 'Confirme quando estiver pronto enviando: OK');
        console.log(`Jogador ${playerId + 1} aceito como "${nick}"`);

        // informar os outros
        if (lobby.length === 1) {
            send(socket, 'Aguardando outro jogador para iniciar a partida...');
        }

        // quando houver 2 jogadores, iniciar partida
        if (lobby.length === 2) {
            broadcast('Ambos conectados! Enviem "OK" quando estiverem prontos.');
        }

        // Esperando jogadores confirmarem OK antes de iniciar
        if (lobby.length === 2 && !gameActive) {
            if (texto.toUpperCase() === 'OK') {
                const player = lobby.find(p => p.socket === socket);
                if (player) {
                player.ready = true;
                broadcast(`${player.nick} está pronto!`);

                if (lobby[0].ready && lobby[1].ready) {
                    broadcast('Ambos confirmaram! Iniciando partida...\n');
                    startMatch();
                }
                }
                return;
            } else {
                send(socket, 'Envie "OK" quando estiver pronto.');
                return;
            }
        }
    });

    socket.on('end', () => {
        console.log('Conexão encerrada:', socket.remoteAddress + ':' + socket.remotePort);
        cleanDisconnect(socket);
    });

    socket.on('error', (err) => {
        console.log('Socket error:', err.message);
        cleanDisconnect(socket);
    });

})

function startMatch() {
  // inicializa pool de perguntas sem repetição
  questionPool = cloneQuestions();
  resetScores();
  gameActive = true;
  resetRoundState();
  broadcast('=== INICIANDO PARTIDA: BATTLE QUIZ! ===');
  broadcast(`Jogador 1: ${lobby[0].nick}  |  Jogador 2: ${lobby[1].nick}`);
  broadcast(`Objetivo: primeiro a ${POINTS_TO_WIN} pontos vence.`);
  nextRound();
}

function resetScores() {
  lobby.forEach(p => p.pontos = 0);
}

function nextRound() {
  // se alguém já venceu, finalizamos
  const winner = lobby.find(p => p.pontos >= POINTS_TO_WIN);
  if (winner) {
    endMatch(winner);
    return;
  }

  // sortear pergunta sem repetição
  if (questionPool.length === 0) {
    // se esgotou, recarrega pool
    questionPool = cloneQuestions();
  }
  currentQuestion = questionPool.pop();

  // enviar pergunta formatada
  const qTextLines = [
    '\n=== NOVA PERGUNTA ===',
    currentQuestion.enunciado,
    `A) ${currentQuestion.alternativas.A}`,
    `B) ${currentQuestion.alternativas.B}`,
    `C) ${currentQuestion.alternativas.C}`,
    `D) ${currentQuestion.alternativas.D}`,
    'Resposta esperada: RESPOSTA-A, RESPOSTA-B, RESPOSTA-C ou RESPOSTA-D'
  ];
  broadcast(qTextLines.join('\n'));
}

function handleGameMessage(socket, texto) {
  const player = lobby.find(p => p.socket === socket);
  if (!player) {
    send(socket, 'Você não está em uma partida ativa.');
    return;
  }
  const id = player.id;

  // processa formatos: RESPOSTA-X, SIM, NAO, S, N
  const rMatch = texto.match(/^RESPOSTA-([A-D])$/i);
  if (rMatch && currentQuestion && roundState) {
    const letra = rMatch[1].toUpperCase();

    // verificar se jogador já respondeu nesta rodada
    if (roundState.respostas[id] !== null) {
      send(socket, 'Você já respondeu nesta rodada.');
      return;
    }

    // registrar
    roundState.respostas[id] = letra;
    roundState.ordem.push(id);
    console.log(`Resposta do jogador ${id + 1} (${player.nick}): ${letra}`);

    // lógica: se primeiro a responder acertou -> pontua imediatamente
    if (roundState.ordem.length === 1) {
      // primeiro a responder: se acertar, pontua e encerra rodada
      if (letra === currentQuestion.correta) {
        awardPointAndReport(id);
        return;
      } else {
        // primeiro errou -> precisa esperar o segundo (ou timeout)
        send(socket, 'Resposta recebida (incorreta). Aguardando a resposta do adversário...');
        // continue waiting for second or timeout
        return;
      }
    }

    // se chegou aqui, é porque agora temos pelo menos duas respostas (segundo respondeu)
    if (roundState.ordem.length >= 2) {
      processTwoResponses();
    }
    return;
  }

  // caso esteja no estado de "pergunta de nova partida" (após anunciar vencedor)
  const yesNo = texto.trim().toUpperCase();
  if (yesNo === 'SIM' || yesNo === 'S' || yesNo === 'NAO' || yesNo === 'N') {
    // tratamos nova partida se estivermos aguardando decisão
    handleNewMatchDecision(player, yesNo.startsWith('S'));
    return;
  }

  // mensagem não reconhecida
  send(socket, 'Comando não reconhecido. Use RESPOSTA-A/B/C/D para responder ou SIM/NAO quando solicitado.');
}

function processTwoResponses() {
  if (!currentQuestion) return;
  // identifica ordem
  const primeiro = roundState.ordem[0];
  const segundo = roundState.ordem[1];
  const respPrimeiro = roundState.respostas[primeiro];
  const respSegundo = roundState.respostas[segundo];
  const correta = currentQuestion.correta;

  if (respPrimeiro === correta) {
    // já teria sido tratado quando respondeu (mas tratar por garantia)
    awardPointAndReport(primeiro);
    return;
  }

  // se primeiro errou e segundo acertou => segundo ganha
  if (respPrimeiro !== correta && respSegundo === correta) {
    awardPointAndReport(segundo);
    return;
  }

  // nenhum acertou
  broadcast(`Nenhum ponto nesta rodada. Respostas: ${lobby[0].nick}=${respString(0)}, ${lobby[1].nick}=${respString(1)}. (Correta: ${correta})`);
  broadcastPlacares();
  // próxima rodada após breve pausa
  setTimeout(nextRound, 1000);
}

function awardPointAndReport(winnerId) {
  lobby[winnerId].pontos += 1;
  broadcast(`Jogador ${winnerId + 1} (${lobby[winnerId].nick}) marcou 1 ponto!`);
  broadcast(`Resposta correta: ${currentQuestion.correta}`);
  broadcastPlacares();
  // verificar se venceu
  if (lobby[winnerId].pontos >= POINTS_TO_WIN) {
    endMatch(lobby[winnerId]);
    return;
  }
  // próxima rodada
  setTimeout(nextRound, 1000);
}

function respString(idx) {
  return roundState && roundState.respostas[idx] ? roundState.respostas[idx] : '-';
}

function broadcastPlacares() {
  broadcast(`PLACAR: ${lobby[0].nick}=${lobby[0].pontos}  |  ${lobby[1].nick}=${lobby[1].pontos}`);
}

function endMatch(winner) {
  gameActive = false;
  broadcast(`\n=== FIM DE PARTIDA ===\nVencedor: ${winner.nick} com ${winner.pontos} pontos!`);
  broadcast('Desejam nova partida? RESPONDAM: SIM ou NAO');
  // preparar objeto que controla respostas de decisão
  matchDecision = {
    decided: [null, null]
  };
}

// estrutura para armazenar decisão de reinício
let matchDecision = null;

function handleNewMatchDecision(player, aceita) {
  if (!matchDecision) {
    send(player.socket, 'No momento não estamos aguardando decisão de nova partida.');
    return;
  }
  matchDecision.decided[player.id] = aceita;
  broadcast(`${player.nick} respondeu: ${aceita ? 'SIM' : 'NAO'}`);

  // se ambos responderam
  if (matchDecision.decided[0] !== null && matchDecision.decided[1] !== null) {
    if (matchDecision.decided[0] && matchDecision.decided[1]) {
      // reiniciar partida
      broadcast('Ambos aceitaram. Reiniciando partida...');
      questionPool = cloneQuestions();
      resetScores();
      matchDecision = null;
      gameActive = true;
      setTimeout(nextRound, 1000);
    } else {
      // encerrar conexões e voltar ao estado inicial
      broadcast('Um dos jogadores não aceitou. Encerrando conexões e voltando ao aguardando novos jogadores...');
      lobby.forEach(p => {
        send(p.socket, 'Encerrando conexão. Obrigado por jogar!');
        p.socket.end();
      });
      // reset tudo
      lobby = [];
      waitingPlayers = [];
      gameActive = false;
      matchDecision = null;
    }
  } else {
    // ainda aguardando o outro jogador
  }
}

// limpa se cliente desconectar
function cleanDisconnect(socket) {
  // remover de waitingPlayers
  waitingPlayers = waitingPlayers.filter(s => s !== socket);

  // se estava no lobby
  const idx = lobby.findIndex(p => p.socket === socket);
  if (idx !== -1) {
    const nick = lobby[idx].nick;
    lobby.splice(idx, 1);
    // avisar outro jogador
    broadcast(`Jogador ${nick} desconectou. Encerrando partida atual (se houver).`);
    // fechar a outra conexão e resetar estado para aguardar novos jogadores
    lobby.forEach(p => {
      send(p.socket, 'O adversário desconectou. A partida foi cancelada. Voltando ao estado de espera.');
      p.socket.end();
    });
    lobby = [];
    waitingPlayers = [];
    gameActive = false;
    questionPool = [];
    currentQuestion = null;
    roundState = null;
    matchDecision = null;
  }
}

server.listen(PORT, ADDRESS, () => {
    console.log(`Servidor TCP rodando em ${ADDRESS}:${PORT}`);
});;