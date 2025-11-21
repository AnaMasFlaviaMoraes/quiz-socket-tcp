const net = require('net');
const { host, port } = require('./config');
const readline = require('readline');

const nickArg = null;

const socket = net.createConnection({ port, host }, () => {
  console.log(`Conectado ao servidor em ${host}:${port}`);
});

socket.setEncoding('utf8');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

socket.on('data', (data) => {
  process.stdout.write('\n' + data.toString());

  if (nickArg && data.toString().includes('Envie seu NickName')) {
    socket.write(nickArg + '\n');
  }

  rl.prompt();
});

socket.on('end', () => {
  console.log('\nConexão encerrada pelo servidor.');
  rl.close();
});

socket.on('error', (err) => {
  console.error('Erro no socket:', err.message);
  rl.close();
});

rl.setPrompt('> ');
rl.on('line', (line) => {
  const msg = line.trim();
  if (!msg) {
    rl.prompt();
    return;
  }
  socket.write(msg + '\n');
  rl.prompt();
});

