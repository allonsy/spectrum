const { keys } = require("../messages");
const { ipcMain } = require("electron");

ipcMain.on(keys.channel, function(event, arg) {
    if (arg.type === keys.type) {
        event.sender.send(keys.channel, ["12345", "5678"]);
    }
})