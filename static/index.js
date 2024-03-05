function connectOnClick(){
    
    const clientId= 'mqttjs_' +parseInt(Math.random() * 100);


    const host=document.getElementById("host").value;
    const port=document.getElementById("port").value;
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;

    const client= mqtt.Client(
        [
            { 
                host: host,
                port: port, 
                clientId: clientId }] );

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

function  publishOnClick() {
    topic = document.getElementById("topc_p").value;

    if (client.isConnected()) {
        client.publish(topic, message);
        document.getElementById("messages").innerHTML += "<span> Published to Topic: " + topic + " | Message: " + message + "</span><br>";
    } else {
        document.getElementById("messages").innerHTML += "<span> Client is not connected</span><br>";
    }
};