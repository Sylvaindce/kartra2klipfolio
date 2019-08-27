class API_server {

    constructor(port) {
        this.port = port;
        this.__kartra_user_model = require("./kartra_user.js");
        this.__klipfolio_user_model = require("./klipfolio_user.js");
        this.__initialize_server();
        this.__initialize_routes();
        this.__app.listen(this.__port, () => console.log(`Listenning on port ${this.__port}.`))
    }

    __initialize_server() {
        const express = require("express");
        this.__app = express();
        this.__app.use(express.json());
    }

    __initialize_routes() {
        this.__app.get('/', this.__welcome);
        this.__app.post('/add_user', this.add_user.bind(this));
    }

    set port(port) {
        this.__port = port;
    }

    get port() {
        return this.__port;
    }

    __welcome(req, res) {
        return res.send("<h1>Kartra to Klipfolio</h1>");
    }

    add_user(req, res) {
        var kartra_user = new this.__kartra_user_model(req.body);
        var klipfolio_user = new this.__klipfolio_user_model(kartra_user.klipfolio)
        return res.send(`200 - OK\n${JSON.stringify(kartra_user.klipfolio)}`);
    }

}


function main() {
    var server = new API_server(3000)
}

if (typeof require !== "undefined" && require.main === module) {
    main()
}