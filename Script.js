// On charge les informations utiles
// CONSTANTES

const statut = document.querySelector("h2");
let jeuActif = true;
let joueurActif = "X";
let etatJeu = ["", "", "", "", "", "", "", "", ""];
const conditionsVictoire = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// MESSAGES

const gagne = () => `Bien joué joueur ${joueurActif} :)`;
const egalite = () => "Ba alors, aucun de vous n'est capable de gagner";
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`;

statut.innerHTML = tourJoueur();

// DETECTIONS DE CLICS

// On parcours chaque case et lorsqu'il y a un clic, on joue la fonction gestionClicCase
document
  .querySelectorAll(".case")
  .forEach((cell) => cell.addEventListener("click", gestionClicCase));

document.querySelector("#recommencer").addEventListener("click", recommencer);

// FONCTIONS

function gestionClicCase() {
  // On récupère l'index de la case cliquée
  const indexCase = parseInt(this.dataset.index);
  console.log(indexCase);
  if (etatJeu[indexCase] != "" || jeuActif != true) {
    // Vérification que la case est Vide
    return; // Je ne fais rien
  }

  // On entre la valeur dans le tableau
  etatJeu[indexCase] = joueurActif;
  console.log(etatJeu);
  this.innerHTML = joueurActif;

  verifGagne();

  verifEgalite();

  if (jeuActif == true) {
    if (joueurActif == "X") {
      joueurActif = "O";
    } else {
      joueurActif = "X";
    }

    statut.innerHTML = tourJoueur();
  }
}

function verifGagne() {
  let tourGagnant = false;

  for (let conditionVictoire of conditionsVictoire) {
    let val1 = etatJeu[conditionVictoire[0]];
    let val2 = etatJeu[conditionVictoire[1]];
    let val3 = etatJeu[conditionVictoire[2]];

    if (val1 == "" || val2 == "" || val3 == "") {
      continue;
    }
    if (val1 == val2 && val2 == val3) {
      tourGagnant = true;
      break;
    }
  }
  if (tourGagnant == true) {
    statut.innerHTML = gagne();
    jeuActif = false;
    return;
  }
}

function verifEgalite() {
  if (!etatJeu.includes("")) {
    statut.innerHTML = egalite();
    jeuActif = false;
    return;
  }
}

function recommencer() {
  jeuActif = true;
  joueurActif = "X";
  etatJeu = ["", "", "", "", "", "", "", "", ""];
  statut.innerHTML = tourJoueur();
  console.log(etatJeu);

  document.querySelectorAll(".case").forEach((cell) => (cell.innerHTML = ""));
}
