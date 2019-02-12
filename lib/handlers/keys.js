const { keys } = require("../messages");
const { ipcMain } = require("electron");
const stellar = require('stellar-sdk');

var keysList = []

const extractPublicKeys = function() {
    return keysList.map((k) => {
        return k.publicKey();
    });
}

const addKey = function(sender, key) {
    keysList.push(key);
    sender.send(keys.GET_ALL_KEYS, extractPublicKeys());
}

const createKey = function(sender) {
    const key = stellar.Keypair.random();
    addKey(sender, key);
    return key;
}

const createKeyFromSecret = function(sender, secret) {
    const key = stellar.Keypair.fromSecret(secret);
    addKey(sender, key);
    return key;
}

ipcMain.on(keys.GET_ALL_KEYS, function(event, arg) {
    const pubKeys = extractPublicKeys();
    event.sender.send(arg._reply, pubKeys);
})

ipcMain.on(keys.CREATE_KEY, (event, arg) => {
    var key;
    if ("secret" in arg) {
        key = createKeyFromSecret(event.sender, arg.secret).publicKey();
    } else {
        key = createKey(event.sender).publicKey();
    }

    if ("_reply" in arg) {
        event.sender.send(arg._reply, {
            publicKey: key
        });
    }
});