import express from "express";
import http from "http";
import { Server } from "socket.io";
import stompit from "stompit";
import CONFIG from "./config.json" with { "type": "json" }


const app = express()
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(CONFIG.www))


app.route('/msg')
    .post((req,res) => {
        console.log(req.body);
        // Connexion à ActiveMQ et envoi du message
        try {
            stompit.connect(CONFIG.connectOptions, (error, client) => {
                if (error) {
                    console.error('Connection error: ' + error.message);
                    res.status(500).send('Connection error');
                    return;
                }

                const frame = client.send({
                    'destination': '/queue/cpe-test',
                });
                frame.write(JSON.stringify(req.body));
                frame.end();
                client.disconnect();
            })
        ;}
        catch (e) {
            console.error('Error: ' + e.message);
            res.status(500).send('Error');
        }
        io.emit('msg', req.body);
    });

app.listen(CONFIG.port, () =>
    console.log(`Listening http://localhost:${CONFIG.port}`)
);

