const MongoClient = require('mongodb').MongoClient;
const debug = require('debug')('storefront:db');

class DB {
    constructor({ host, port, username, password }) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;

        this.connection = null;
    }

    connect(dbName) {
        const user = encodeURIComponent(this.username);
        const password = encodeURIComponent(this.password);
        const authMechanism = 'DEFAULT';

        // Connection URL
        const url = `mongodb://${user}:${password}@${this.host}:${this.port}/?authMechanism=${authMechanism}`;

        const client = new MongoClient(url);

        // Use connect method to connect to the Server
        return new Promise((resolve, reject) => {
            client.connect((err, connection) => {
                if (err) {
                    debug(`got error ${err} connecting to mongo`);
                    reject(err);
                } else {
                    debug("Connected correctly to server");

                    this.connection = connection;

                    const db = this.connection.db(dbName);

                    resolve(db);
                }
            });
        })
    }

    close() {
        this.connection.close();
    }
}

module.exports = DB;
