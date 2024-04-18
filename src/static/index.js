let client;

function connectOnClick() {
    const clientId = 'mqttjs_' + parseInt(Math.random() * 100);

    let host = document.getElementById("host").value;
    const port = document.getElementById("port").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!host.startsWith('wss://') && (port== 8081 ||port==8091) && host=='test.mosquitto.org') {
        host = 'wss://' + host;
    }
    

    client = mqtt.connect(`${host}:${port}`, {
        clientId: clientId,
        username: username || null,
        password: password || null,
    });

    document.getElementById("output").innerHTML += "<span>Connecting the client: " + host + " ... </span><br>";
    document.getElementById("output").innerHTML += "<span>On Port:" + port + " ... </span><br>";
    console.log(client)
    
    client.on('connect', onConnect);
    client.on('error', onConnectError);
    client.on('close', onConnectionLost);
    client.on('disconnect,', disconnectOnClick);
}

function onConnect() {
    const topic = document.getElementById("topic_s").value;

    document.getElementById("output").innerHTML += "<span> Subscribing the Topic: " + topic + " ... </span><br>";

    client.subscribe(topic);
}

function onConnectError(err) {
    console.log("Connection error", err);
}

function onConnectionLost(responseObject) {
    if (responseObject) {
        document.getElementById("output").innerHTML += "<span> ERROR: Connection Lost ... </span><br>";
        if (responseObject.errorMessage) {
          document.getElementById("output").innerHTML += "<span> ERROR:" + responseObject.errorMessage + "</span><br>";
        }
      } else {
        // Handle the case where responseObject is undefined
        console.log("Connection lost, but response object is undefined.");
      }
    }


function disconnectOnClick() {

    const topic = document.getElementById("topic_s").value;

    if (client && client.connected) {

        client.unsubscribe(topic);
        document.getElementById("output").innerHTML += "<span> Unsubscribe succesfully</span><br>";
        console.log(client)

        client.end();
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