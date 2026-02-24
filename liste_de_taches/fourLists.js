// On repère les quatre listes avec quatres statuts différents

let a_faire = document.getElementById("a_faire");
let en_cours = document.getElementById("en_cours");
let fait = document.getElementById("fait");
let corbeille = document.getElementById("corbeille")

// On rend ces quatres listes dynamiques en rendant ses éléments draggable et droppable

let s1 = Sortable.create(a_faire, {
    animation: 150,
    group: 'lol'
})

let s2 = Sortable.create(en_cours, {
    animation: 150,
    group: 'lol'
})

let s3 = Sortable.create(fait, {
    animation: 150,
    group: 'lol'
})

let s4 = Sortable.create(corbeille, {
    animation: 150,
    group: 'lol'
})

// on identifie la zone de texte avec queryselector

let tache = document.querySelector("#tache");

/**
 * Fonction pour ajouter une tâche avec le bouton
 * @returns condition de sortie
 */

function ajouterTache() {
    if(tache.value == "") {
        return;
    }
    let elem = document.createElement("li");
    elem.className = "list-group-item";
    elem.textContent = tache.value;
    document.getElementById("a_faire").appendChild(elem);
    tache.value = "";
}

/**
 * Fonction pour remplir automatiquement notre liste avec un document de backup
 * @param {String} liste dans la quelle on veut stocker la tâche 
 * @param {String} tache que l'on veut stocker
 * @returns condition d'arrêt
 */

function ajouterTacheAuto(liste, tache) {
    if(tache == "") {
        return;
    }
    let elem = document.createElement("li");
    elem.className = "list-group-item";
    elem.innerText = tache;
    document.getElementById(liste).appendChild(elem);
}

/**
 * Fonction qui efface tous les éléments de la liste corbeille
 */

function viderCorbeille() {
    corbeille.innerHTML = "";
}

/**
 * Fonction qui agit en complément de ajouterTacheAuto() pour accéder aux donnée sd'un JSON pour remplir automatiquement
 * @param {JSON} json 
 */

function afficherTasks(json){
    for(let task of json.a_faire.tasks) {
        if(task === "") {
            continue;
        }
        ajouterTacheAuto("a_faire", task)
    }

    for(let task of json.fait.tasks) {
        if(task === "") {
            continue;
        }
        ajouterTacheAuto("fait", task)
    }

    for(let task of json.en_cours.tasks) {
        if(task === "") {
            continue;
        }
        ajouterTacheAuto("en_cours", task)
    }

    for(let task of json.corbeille.tasks) {
        if(task === "") {
            continue;
        }
        ajouterTacheAuto("corbeille", task)
    }
}

/**
 * Fonction prenant une image de ce que contiennent les quatre listes
 * @returns JSON représentant l'état actuel des listes
 */

function documentSauvegarde(){
    let json = {"fait":{
    "tasks":[]
}, "a_faire":{
    "tasks":[]
}, "corbeille":{
    "tasks":[]
}, "en_cours":{
    "tasks":[]
}}
    for( let x of a_faire.querySelectorAll("li")) {
        json.a_faire.tasks.push(x.textContent);
    }
    for( let y of fait.querySelectorAll("li")) {
        json.fait.tasks.push(y.textContent);
    }
    for( let z of corbeille.querySelectorAll("li")) {
        json.corbeille.tasks.push(z.textContent);
    }
    for( let w of en_cours.querySelectorAll("li")) {
        json.en_cours.tasks.push(w.textContent);
    }
    return json;
}

/**
 * Fonction ui crée un fichier TEMPORAIRE (ne fonctionne pas après l'arrêt de live server) et le stocke afin de pouvoir revenir à sa liste.
 */

function sauvegarderTaches() {
  // On transforme l'objet en texte (string)
  let json = documentSauvegarde()
  let texteJSON = JSON.stringify(json);
  
  // On le sauvegarde dans le navigateur sous le nom "mesTachesSauvegardees"
  localStorage.setItem("mesTachesSauvegardees", texteJSON);
  
  console.log("Sauvegarde réussie !");
}

// Appel de la fonction quand tu ajoutes une tâche

/**
 * 
 * @returns retourne le JSON nécessaire pour afficher les tâches au chargement de la page
 */

function chargerTachesSauvegardees() {
  // On récupère le texte depuis le navigateur
  let texteJSON = localStorage.getItem("mesTachesSauvegardees");
  
  // Si on a trouvé quelque chose, on le retransforme en objet JavaScript
  if (texteJSON) {
    let mesListesRecuperees = JSON.parse(texteJSON);
    return mesListesRecuperees;
  } else {
    // S'il n'y a pas de sauvegarde, on retourne des données par défaut vides
    return {"fait":{
    "tasks":[]
}, "a_faire":{
    "tasks":[]
}, "corbeille":{
    "tasks":[]
}, "en_cours":{
    "tasks":[]
}};
  }
}
let sauvegarde = chargerTachesSauvegardees()
afficherTasks(sauvegarde);