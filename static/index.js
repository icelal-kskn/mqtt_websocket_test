let client;

function connectOnClick() {
    const clientId = 'mqttjs_' + parseInt(Math.random() * 100);

    let host = document.getElementById("host").value;
    const port = document.getElementById("port").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!host.startsWith('wss://')) {
        host = 'wss://' + host;
    }

    client = mqtt.connect(`${host}:${port}`, {
        clientId: clientId,
        username: username || null,
        password: password || null,
    });

    document.getElementById("output").innerHTML += "<span>Connecting the client: " + host + " ... </span><br>";
    document.getElementById("output").innerHTML += "<span>On Port:" + port + " ... </span><br>";
    
    client.on('connect', onConnect);
    client.on('error', onConnectError);
    client.on('close', onConnectionLost);
}

function onConnect() {
    const topic = document.getElementById("topic_s").value;

    document.getElementById("output").innerHTML += "<span> Subscribing the Topic: " + topic + " ... </span><br>";

    client.subscribe(topic);
    console.log(client)
}

function onConnectError(err) {
    console.log("Connection error", err);
}

function onConnectionLost(responseObject) {
    document.getElementById("output").innerHTML += "<span> ERROR: Connection Lost ... </span><br>";
    if (responseObject.errorMessage) {
        document.getElementById("output").innerHTML += "<span> ERROR:" + responseObject.errorMessage + "</span><br>";
    }
}

function onMessageArrived(message) {
    console.log("onMessageArrived called: " + message.payloadString);
    document.getElementById("output").innerHTML += "<span> Topic: " + message.destinationName + "| Message: " + message.payloadString + "</span><br>";
}

function disconnectOnClick() {
    if (client && client.isConnected()) {
        client.disconnect();
        document.getElementById("output").innerHTML += "<span> Disconnected successfully</span><br>";
    } else {
        document.getElementById("output").innerHTML += "<span> Client is not connected</span><br>";
    }
}

function publishOnClick() {
    const topic = document.getElementById("topc_p").value;
    const message = document.getElementById("message").value;

    if (client) {
        client.publish(topic, message);
        document.getElementById("output").innerHTML += "<span> Published to Topic: " + topic + " | Message: " + message + "</span><br>";
    } else {
        document.getElementById("output").innerHTML += "<span> Client is not connected</span><br>";
    }
}