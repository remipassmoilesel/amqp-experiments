import * as amqp from "amqplib";

console.log("Starting publisher");

let channelName = 'workerChannel1';
let connection = amqp.connect();

// Publisher

connection.then(function (conn) {
    return conn.createChannel();
})
    .then(function (ch) {
        return ch.assertQueue(channelName).then(function (ok) {
            let i = 0;
            setInterval(function () {
                let ev = {i: i, time: Date.now()};
                let status = ch.sendToQueue(channelName, new Buffer(JSON.stringify(ev)));
                console.log("Sending event: (event, status) ", ev, status);

                i++;
            }, 1000);

        });
    }).catch(console.warn);
