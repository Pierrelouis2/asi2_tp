import express from "express";
import http from "http";
import { Server } from "socket.io";
import stompit from "stompit";
import CONFIG from "./config.json" with { "type": "json" }


const app = express()
const server = http.createServer(app);
const ioServer = new Server(server);

app.use(express.json());
app.use(express.static(CONFIG.www))


app.post('/msg',(req,res) => {
    console.log(req.body);
    postInQueue(req.body);
});

ioServer.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});



server.listen(CONFIG.port, () =>
    console.log(`Listening http://localhost:${CONFIG.port}`)
);


function postInQueue(data) {
    stompit.connect(CONFIG.connectOptions, (error, client) => {
        if (error) {
            console.error('Connection error: ' + error.message);
            return;
        }

        const frame = client.send({
            'destination': 'fr.cpe.spring-app.in',
        });
        frame.write(JSON.stringify(data));
        frame.end();
        client.disconnect();
    });
}

stompit.connect(CONFIG.connectOptions, (error, client) => {
    if (error) {
        console.error('Connection error: ' + error.message);
        return;
    }

    const subscribeHeaders = {
        'destination': 'fr.cpe.nodejs-app.in',
        'ack': "client-individual",
    };

    client.subscribe(subscribeHeaders, (error, message) => {
        if (error) {
            console.error('Subscription error: ' + error.message);
            return;
        }

        message.readString('utf-8', (error, body) => {
            if (error) {
                console.error('Failed to read message: ' + error.message);
                return;
            }
            console.log('Received message: ' + body);
            let data = JSON.parse(body);
            data.node ="OK";
            ioServer.emit('queueReturn', data);
            client.ack(message);
        });
    });
});