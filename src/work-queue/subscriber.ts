import * as amqp from "amqplib";

let channelName = 'workerChannel1';

console.log("Starting subscriber on working queue: " + channelName);

let connection = amqp.connect();

let processMessage = function (message) {
    if (message) {
        console.log("Receiving message: ", message.content.toString());
    }

    else {
        console.log("### Receiving null message");
    }
};

// Consumer
connection.then(function (conn) {
    return conn.createChannel();
}).then(function (ch) {
    return ch.assertQueue(channelName).then(function (err, ok) {
        return ch.consume(channelName, processMessage, {noAck: false});
    });
}).catch(console.warn);