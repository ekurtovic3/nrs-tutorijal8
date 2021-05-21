const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
chai.should();
chai.use(chaiHttp);


describe('Testiranje servera', function () {
    let grad = { id: 5, naziv: 'Tokyo', broj_stanovnika: 50 };

   
    describe('POST zahtjev', () => {

        it('Api za /grad', (done) => {

            chai.request(app)
                .post('/grad')
                .send(grad)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('naziv');
                    done();
                });
        });
    });

    describe('GET zahtjev ', () => {
        it('Vraca grad sa proslijedenim idom', (done) => {
            chai.request(app)
                .get('/gradovi/' + grad.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('naziv').eql('Tokyo');
                    done();
                });
        });

    });


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