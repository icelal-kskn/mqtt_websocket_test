function connectOnClick(){
    if (typeof Paho !== 'undefined') {
    clientId= parseInt(Math.random() * 100);

    const host = document.getElementById("host").value;
    const port = document.getElementById("port").value;
    const usernameId = document.getElementById( "username" ).value;
    const passwordId = document.getElementById("password").value;

    document.getElementById("messages").innerHTML += "<span> Connecting to: " + host  +" on port: " + port + " ... </span> <br>"
    document.getElementById("messages").innerHTML += "<span> ClientID: " + + clientId  +" ... </span> <br>"

    client= new Paho.MQTT.Client(host,port,clientId);
    client.onConnectionLost = onConnectionLost; 
    client.onMessageArrived = onMessageArrived; 

    client.connect({
        onSuccess : onConnect
    });
    }
    else{
        console.error("Paho MQTT library not loaded.");
    }
};

function onConnect(){
    topic= document.getElementById("topic_s").value;
    
    document.getElementById("messages").innerHTML += "<span> Subscribing the Topic:" + topic  +" ... </span><br>"
    
    client.subscribe(topic)
};


function onConnectionLost(responseObject){
    document.getElementById("messages").innerHTML += "<span> ERROR: Connection Lost ... </span><br>"
    if(responseObject.errorMessage) {
        document.getElementById("messages").innerHTML += "<span> ERROR:"+ responseObject.errorMessage + "</span><br>";
    }
};
function onMessageArrived(message){
    console.log("onMessageArrived called: " +message.payloadString);
    document.getElementById("messages").innerHTML += "<span> Topic: "+ message.destinationName+"| Message: "+message.payloadString + "</span><br>";
};

function disconnectOnClick(){
    if (client.isConnected()) {
        client.disconnect();
        document.getElementById("messages").innerHTML += "<span> Disconnected successfully</span><br>";
    } else {
        document.getElementById("messages").innerHTML += "<span> Client is not connected</span><br>";
    }
};

function  publishOcClick() {
    topic = document.getElementById("topc_p").value;

    if (client.isConnected()) {
        client.publish(topic, message);
        document.getElementById("messages").innerHTML += "<span> Published to Topic: " + topic + " | Message: " + message + "</span><br>";
    } else {
        document.getElementById("messages").innerHTML += "<span> Client is not connected</span><br>";
    }
};