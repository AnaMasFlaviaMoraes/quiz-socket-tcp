
const express = require('express');
const app = express();

app.use(express.urlencoded({  extended: true }));

app.get('/',(req,res)=>{
    res.send('Hello World!');

});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
