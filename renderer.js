const ReactDOM = require('react-dom');
const react = require('react');
const { Sidebar } = require('./components/sidebar');
const { keys, sendToMain } = require("./lib/messages");
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

sidebar = document.getElementById("sidebar");
ReactDOM.render(react.createElement(Sidebar), sidebar);