const net = require('net');
const { host, port } = require('./config');
const { createInput } = require('./utils/input');

const { rl, question } = createInput();

const client = new net.Socket();

client.connect(port, host, async () => {
  console.log('Conectado ao servidor BATTLE QUIZ');

  const nickname = await question('Digite seu nickname: ');
  client.write(JSON.stringify({ type: 'NICKNAME', nickname }));
});

client.on('data', async (data) => {
  const msg = data.toString();

  let payload;
  try {
    payload = JSON.parse(msg);
  } catch (e) {
    console.log('Mensagem do servidor:', msg);
    return;
  }

  switch (payload.type) {
    case 'WELCOME':
      console.log(payload.message); 
      break;

    case 'QUESTION':
      console.log('\n=== NOVA PERGUNTA ===');
      console.log(payload.question);
      payload.options.forEach((opt) => console.log(opt));

      const answer = await question('Sua resposta (ex: A, B, C, D): ');
      client.write(JSON.stringify({
        type: 'ANSWER',
        answer: answer.trim().toUpperCase(),
        questionId: payload.questionId
      }));
      break;

    case 'SCORE':
      console.log('\n--- PLACAR ATUAL ---');
      console.log(payload.scoreText); 
      break;

    case 'END':
      console.log(`\nJogo encerrado. Vencedor: ${payload.winner}`);
      if (payload.askNewGame) {
        const again = await question('Deseja nova partida? (S/N): ');
        client.write(JSON.stringify({
          type: 'NEW_GAME_RESPONSE',
          value: again.trim().toUpperCase() === 'S'
        }));
      } else {
        console.log('Encerrando...');
        rl.close();
        client.destroy();
      }
      break;

    default:
      console.log('Servidor:', payload);
  }
});

client.on('close', () => {
  console.log('Conexão encerrada pelo servidor.');
  rl.close();
});

client.on('error', (err) => {
  console.error('Erro no cliente:', err.message);
});
