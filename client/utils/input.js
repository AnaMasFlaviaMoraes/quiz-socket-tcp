const readline = require('readline');

function createInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function question(prompt) {
    return new Promise((resolve) => {
      rl.question(prompt, (answer) => resolve(answer));
    });
  }

  return { rl, question };
}

module.exports = { createInput };
