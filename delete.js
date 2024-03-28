const pg = require('pg');
require('dotenv').config();

const config = {
    host: process.env.HOST,
    user: process.env.USER,     
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    ssl: true
};

const client = new pg.Client(config);

client.connect(err => {
    if (err) {
        throw err;
    } else {
        queryDatabase();
    }
});

function queryDatabase() {
    const query = `
        DELETE FROM inventory 
        WHERE name = 'apple';
    `;

    client
        .query(query)
        .then(result => {
            console.log('Delete completed');
            console.log(`Rows affected: ${result.rowCount}`);
            client.end(console.log('Closed client connection'));
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}