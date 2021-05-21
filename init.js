const db = require('./db/db');

db.sequelize.sync({ force: true }).then(function () {
    dataInit().then(() => {
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function dataInit() {
    const gradoviPromiseList = [
        db.gradovi.create({id: 1, naziv: 'Dortmund',broj_stanovnika: 100000}),
        db.gradovi.create({id: 2, naziv: 'Leipzig',broj_stanovnika: 200000}),
        db.gradovi.create({id: 3, naziv: 'Munchen',broj_stanovnika: 300000})
    ];
    
    return new Promise((resolve, reject) => {
        Promise.all(gradoviPromiseList)
            .catch(reason => reject(reason));
    });
}