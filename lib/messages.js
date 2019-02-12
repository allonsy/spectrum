const { ipcRenderer } = require("electron");
const uuid = require('uuid/v1');

const keys = {
    GET_ALL_KEYS: "KEYS/GET_ALL_KEYS",
    CREATE_KEY: "KEYS/CREATE_KEY",
};

const sendToMain = (mtype, payload, cb) => {
    const id = "renderer_reply_" + uuid();
    payload._reply = id;
    ipcRenderer.once(id, (evt, args) => {
        cb(args);
    });
    ipcRenderer.send(mtype, payload);
}

module.exports = {
    keys,
    sendToMain,
}