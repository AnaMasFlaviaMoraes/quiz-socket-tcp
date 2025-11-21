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

module.exports = { perguntasOriginais };