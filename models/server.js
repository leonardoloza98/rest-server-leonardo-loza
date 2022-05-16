const express = require("express");
const cors = require("cors");
const router = require("../routes/usuarios")
const {dbConnection} = require("../database/config")

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.conectarDB();

        this.middlewares();

        this.routes();
        
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use("/api/usuarios", router)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en puerto ", this.port)
        });
    }
}

module.exports=Server;