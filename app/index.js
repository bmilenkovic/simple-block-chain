const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const bc = new Blockchain();

app.get('/blocks', (req, resp) => { 
    resp.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    // p2pServer.syncChains();
    res.redirect('/blocks');
}); 

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));


 