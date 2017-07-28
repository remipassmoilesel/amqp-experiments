import Provider from "./Provider";
import Consummer from "./Consummer";

let provider = new Provider({url: "amqp://guest:guest@localhost:5672"});
let consummer = new Consummer({url: "amqp://guest:guest@localhost:5672"});

// send events
let sent = provider.publish("user-management.*", {status: "service-initialized"});
sent = provider.publish("user-management.events.user-created", {id: 1, login: "user1", address: "far far far"});
sent = provider.publish("user-management.events.user-deleted", {id: 3, login: "user1", address: "far far far"});
sent = provider.publish("user-management.events.user-modified", {id: 2, login: "user2", address: "far far far"});

sent = provider.publish("media-management.index.list-updated", {});
sent = provider.publish("media-management.media-enlarged", {id: 2, name: "media.jpg", width: 200, height: 300});
sent = provider.publish("media-management.media-shrinked", {id: 2, name: "media.jpg", width: 200, height: 300});

// ask for work
sent = provider.publish("user-management.operations.create-user", {id: 1, login: "user1", address: "far far far"});
sent = provider.publish("user-management.operations.delete-user", {id: 3, login: "user1", address: "far far far"});
sent = provider.publish("user-management.operations.modify-user", {id: 3, login: "user1", address: "far far far"});

sent = provider.publish("media-management.index.update-list", {});
sent = provider.publish("media-management.operations.shrink", {id: 2, name: "media.jpg", width: 200, height: 300});
sent = provider.publish("media-management.operations.enlarge", {id: 2, name: "media.jpg", width: 200, height: 300});

// listen events

consummer.subscribe("user-management.events.user-created", console.log);
consummer.subscribe("user-management.events.user-deleted", console.log);
consummer.subscribe("user-management.events.user-modified", console.log);
