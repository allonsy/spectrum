const react = require('react');
const { ipcRenderer } = require('electron');
const { keys } = require('../lib/messages');
class Sidebar extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            publicKeys: []
        };
        
        this.allKeysHandler = this.allKeysHandler.bind(this);
    }

    getSeedInputID() {
        return "seed_input_field";
    }

    componentDidMount() {
        this.subscribe();
        this.init();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    init() {
        const payload = {
            _reply: keys.GET_ALL_KEYS,
        }
        ipcRenderer.send(keys.GET_ALL_KEYS, payload);
    }

    allKeysHandler(evt, arg) {
        this.setState({
            publicKeys: arg
        });
    }

    subscribe() {
        ipcRenderer.on(keys.GET_ALL_KEYS, this.allKeysHandler);
    }

    unsubscribe() {
        ipcRenderer.removeListener(keys.GET_ALL_KEYS, this.allKeysHandler);
    }

    buttonPress() {
        console.log("pressed");
    }

    genRandomKey() {
        ipcRenderer.send(keys.CREATE_KEY, {});
    }

    getSeededKey() {
        const seed = document.getElementById(this.getSeedInputID()).value;
        ipcRenderer.send(keys.CREATE_KEY, {
            seed
        });
    }

    renderNoKeys() {
        const messageText = react.createElement('div', { 
            key: 'messageText',
            className: 'sidebar_text',
        }, "No Keys Found!");
        const randomButton = react.createElement('button', { 
            key: 'randomButton',
            className: 'sidebar_random_button',
            onClick: () => this.genRandomKey(),
        }, 'Generate random key');
        const topHrule = react.createElement('hr', {
            key: 'topHRule'
        });
        const botHrule = react.createElement('hr', {
            key: 'botHRule'
        });
        const orText = react.createElement('div', { 
            key: 'orText',
            className: 'sidebar_text sidebar_ortext',
        }, "-OR-");
        const seedText = react.createElement('div', { 
            key: 'seedText',
            className: 'sidebar_text',
        }, "Please enter your secret seed");
        const seedInput = react.createElement('input', {
            key: 'seedInput',
            type: 'text',
            name: 'seed',
            id: this.getSeedInputID(),
            className: 'sidebar_seed_input',
        });
        const seedButton = react.createElement('button', { 
            key: 'seedButton',
            className: 'sidebar_generate_button',
        }, "Generate Key From Seed");
        
        return [
            messageText,
            randomButton,
            topHrule,
            orText,
            botHrule,
            seedText,
            seedInput,
            seedButton
        ];
    }

    render() {

        if (this.state.publicKeys == undefined || this.state.publicKeys === null) {
            return "Loading...";
        } else if (this.state.publicKeys.length == 0) {
            return this.renderNoKeys();
        }
        const listItems = this.state.publicKeys.map((val) => {
            return react.createElement("li", {key: val}, val);
        })
        const button = react.createElement("button", {
            key: "button",
            onClick: () => this.buttonPress(),
        }, "Press me!");
        return [
            react.createElement("ul", {key: 'list'}, listItems),
            button,
        ]
    }
}

module.exports = {
    Sidebar,
}