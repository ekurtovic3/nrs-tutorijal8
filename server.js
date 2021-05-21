const express = require('express')
const base = require('./db/db')
const path = require('path')
var bodyParser = require('body-parser')
const app = express()
const port = 3000





app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/gradovi', (req, res) => base.gradovi.findAll().then(gradovi => res.json(gradovi)));
app.get('/gradovi/:id' , (req, res) =>  base.gradovi.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data) })   
);

app.delete('/gradovi/:id', (req, res) => base.gradovi.destroy({
    where: { id: req.params.id }
}).then(() => { res.json({ status: 'Deleted' }) }));

app.post('/grad', function (req, res) {
    if (!req.body)
        res.json({ error: 'Bad Data' })
        base.gradovi.create(req.body).then(data => { res.send(data) }).catch(function (err) { res.sendStatus(500) })
});

app.put('/gradovi/:id', function (req, res) {
    if (!req.body)
        res.json({ error: 'Bad Data' })
    var v = req.body;
    base.gradovi.update({
        naziv: v.naziv,
        broj_stanovnika: v.broj_stanovnika,
    }, { where: { id: req.params.id } }).then(() => { res.json({ status: 'Updated!' }) })
});
 var server=app.listen(port, () => {
    console.log(`Server je pokrenut na http://localhost:${port}`)
})
module.exports = server