const makeRequestMessage = function(messageType) {
    return {
        type: messageType
    }
}

const getMessageType = function(obj) {
    if ('type' in obj) {
        return obj.type;
    } else {
        return null;
    }
}

const keys = {
    channel: "keys",
    type: "GET_ALL_KEYS",
    getKeysRequest: makeRequestMessage("GET_ALL_KEYS")
};

module.exports = {
    keys,
    makeRequestMessage,
    getMessageType
}