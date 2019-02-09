const { ipcRenderer } = require("electron");
const { keys } = require("./messages");
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const renderSideBar = function(keys) {
    sidebar = document.getElementById("sidebar");
    htmlString = "";
    for (var i = 0; i < keys.length; i++) {
        htmlString += keys[i]
        htmlString += "<br>";
    }
    console.log("setting html: " + htmlString);
    sidebar.innerHTML = htmlString;
}

ipcRenderer.on(keys.channel, function(evt, arg) {
    console.log("Received key response: ")
    renderSideBar(arg);
})

ipcRenderer.send(keys.channel, keys.getKeysRequest);
console.log("sent message");