import * as amqp from "amqplib";

let queueName = 'worker1';

let connection = amqp.connect();

// Publisher
connection.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    return ch.assertQueue(queueName).then(function(ok) {
        return ch.sendToQueue(queueName, new Buffer('something to do'));
    });
}).catch(console.warn);

// Consumer
connection.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    return ch.assertQueue(queueName).then(function(ok) {
        return ch.consume(queueName, function(msg) {
            if (msg !== null) {
                console.log(msg.content.toString());
                ch.ack(msg);
            }
        });
    });
}).catch(console.warn);