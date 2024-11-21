function go(){
    console.log("go");
    let socket = io(); 
    socket.on('queueReturn', function(data){ 
        alert(JSON.stringify(data));
        socket.disconnect();
    });
    nom = document.getElementById("nom").value;
    prenom = document.getElementById("prenom").value;
    fetch('/msg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nom: nom, prenom: prenom})
    })
}


