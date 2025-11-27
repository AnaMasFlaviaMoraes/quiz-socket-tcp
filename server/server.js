const net = require('net');
const { perguntasOriginais } = require('./utils/bancoPerguntas');

const PORT = 10000;
const ADDRESS = '127.0.0.1';
const POINTS_TO_WIN = 30;

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
    if (!texto) return;

    const player = lobby.find(p => p.socket === socket);

    if (lobby.length === 2 &&  (gameActive || matchDecision)) {
      handleGameMessage(socket, texto);
      return;
    }

    if (!player) {
      if (lobby.length >= 2) {
        send(socket, 'Servidor já está cheio. Tente novamente mais tarde.');
        socket.end();
        return;
      }

      const nick = texto || ('Player' + Math.floor(Math.random() * 1000));
      const playerId = lobby.length;

      lobby.push({ socket, nick, id: playerId, pontos: 0, ready: false });
      waitingPlayers = waitingPlayers.filter(s => s !== socket);

      send(socket, 'Cliente Aceito para o BATTLE QUIZ');
      send(socket, 'Confirme quando estiver pronto enviando: OK');
      console.log(`Jogador ${playerId + 1} aceito como "${nick}"`);

      if (lobby.length === 1) {
        send(socket, 'Aguardando outro jogador para iniciar a partida...');
      }

      if (lobby.length === 2) {
        broadcast('Ambos conectados! Enviem "OK" quando estiverem prontos.');
      }

      return; 
    }

    if (!gameActive) {
      if (lobby.length < 2) {
        send(socket, 'Aguardando o outro jogador...');
        return;
      }

      if (texto.toUpperCase() === 'OK') {
        player.ready = true;
        broadcast(`${player.nick} está pronto!`);

        if (lobby[0].ready && lobby[1].ready) {
          broadcast('Ambos confirmaram! Iniciando partida...\n');
          startMatch();
        }
      } else {
        send(socket, 'Envie "OK" quando estiver pronto.');
      }
      return;
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
  const winner = lobby.find(p => p.pontos >= POINTS_TO_WIN);
  if (winner) {
    endMatch(winner);
    return;
  }

  resetRoundState();

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

    // se primeiro a responder acertou -> pontua imediatamente
    if (roundState.ordem.length === 1) {
      if (letra === currentQuestion.correta) {
        awardPointAndReport(id);
        return;
      } else {
        send(socket, 'Resposta recebida (incorreta). Aguardando a resposta do adversário...');
        return;
      }
    }

    if (roundState.ordem.length >= 2) {
      processTwoResponses();
    }
    return;
  }

  // caso esteja no estado de "pergunta de nova partida" 
  const yesNo = texto.trim().toUpperCase();
  if (yesNo === 'SIM' || yesNo === 'S' || yesNo === 'NAO' || yesNo === 'N') {
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
    awardPointAndReport(primeiro);
    return;
  }

  // se primeiro errou e segundo acertou => segundo ganha
  if (respPrimeiro !== correta && respSegundo === correta) {
    awardPointAndReport(segundo, 3); 
    return;
  }

  // nenhum acertou
  broadcast(`Nenhum ponto nesta rodada. Respostas: ${lobby[0].nick}=${respString(0)}, ${lobby[1].nick}=${respString(1)}. (Correta: ${correta})`);
  broadcastPlacares();
  // próxima rodada após breve pausa
  setTimeout(nextRound, 1000);
}

function awardPointAndReport(winnerId, pontos = 5) {
  lobby[winnerId].pontos += pontos;

  const jogador = lobby[winnerId];

  broadcast(`Jogador ${winnerId + 1} (${jogador.nick}) marcou ${pontos} pontos!`);
  broadcast(`Resposta correta: ${currentQuestion.correta}`);
  broadcastPlacares();

  if (jogador.pontos >= POINTS_TO_WIN) {
    endMatch(jogador);
    return;
  }

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
      resetRoundState();
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