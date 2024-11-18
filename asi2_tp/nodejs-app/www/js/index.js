function go(){
    console.log("go");
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