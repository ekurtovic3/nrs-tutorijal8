const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
chai.should();
chai.use(chaiHttp);
const db = require('.././db/db');


describe('Testiranje servera', function () {
    let grad = { id: 10, naziv: 'Lisabon', broj_stanovnika: 7000000 };
    let grad2 = { id: 50, naziv: 'Zagreb', broj_stanovnika: 100 };

    before(function () {
        db.gradovi.create({id: 10, naziv: 'Dortmund',broj_stanovnika: 100000}),
        db.gradovi.create({id: 11, naziv: 'Leipzig',broj_stanovnika: 200000}),
        db.gradovi.create({id: 15, naziv: 'Munchen',broj_stanovnika: 300000})
    });

    beforeEach(function () {
        chai.request(app)
        .post('/grad')
        .send({id:5,naziv: 'Tokyo', broj_stanovnika: 500000})
        .end((err,res)=>{
            brojac = res.body.id;
        });
    });

    afterEach(function () {
        chai.request(app)
        .delete('gradovi/5')
        .end()
    });


    after(function () {
        chai.request(app)
        .delete('gradovi/deleteAll')
        .end()
    });
   
   describe('POST zahtjev', () => {

        it('Api za /grad', (done) => {

            chai.request(app)
                .post('/grad')
                .send(grad2)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('naziv');
                    done();
                });
        });
    });

  /*  describe('GET zahtjev ', () => {
        it('Vraca grad sa proslijedenim idom', (done) => {
            chai.request(app)
                .get('/gradovi/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('naziv').eql('Dortmund');
                    done();
                });
        });

    });
*/

    describe('PUT ', () => {
        it('Ubacivanje grada u bazu', (done) => {
            chai.request(app)
                .put('/gradovi/' + grad.id)
                .send({ naziv: "Madrid", broj_stanovnika: "60000000" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('Updated!');
                    done();
                });
        });

    });


    describe('Delete', () => {
        it('Brise grad iz baze', (done) => {
            chai.request(app)
                .delete('/gradovi/' + grad.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('Deleted');
                    done();
                });
        });

    });



    describe('GET', () => {

        it('grad', (done) => {
            chai.request(app)
                .get('/gradovi/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    //res.body.should.be.a('array');
                    console.log("ISPIS: "+res.body.naziv)
                    res.body.should.have.property('naziv').eql("Dortmund");
                    done();
                });
        });

        
    });

});