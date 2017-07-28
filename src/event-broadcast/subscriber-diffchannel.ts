import * as amqp from "amqplib";

// This subscriber listen a different channel, so no event should be received

console.log("Starting subscriber with a different channel name");

let channelName = 'channel2';
let connection = amqp.connect();

// Consumer
connection.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    return ch.assertQueue(channelName).then(function(err, ok) {
        return ch.consume(channelName, function(message) {
            if(message){
                console.log("Receiving message: ", message.content.toString());
            }

            else {
                console.log("### Receiving null message");
            }
            ch.ack(message);
        });
    });
}).catch(console.warn);