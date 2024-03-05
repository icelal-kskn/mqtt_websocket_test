function connectOnClick(){

    clientId="ClientID: " + parseInt(Math.random() * 100);

    host = document.getElementById("host").value;
    port = document.getElementById("port").value;
    usernameId = document.getElementById( "username" ).value;
    passwordId = document.getElementById("password").value;

    document.getElementById("messages").innerHTML += "<span> Connecting to: " + host  +" on port: " + port + " ... </span><br>"
    document.getElementById("messages").innerHTML += "<span>" + clientId  +" ... </span><br>"

    client= new Paho.MQTT.Client(host,Number(port),clientId);
    client.onConnectionLost = onConnectionLost; 
    client.onMessageArrived = onMessageArrived; 

    client.connect({
        onSucces : onConnect
    });

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

};

function  publishOcClick() {

};