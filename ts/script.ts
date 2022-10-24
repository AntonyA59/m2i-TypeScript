let compteur: number = 0;
let divCompteur: HTMLElement = document.getElementById("compteur");
let btn: HTMLElement = document.getElementById("btn");
btn.addEventListener("click", incrementCompteur);

function incrementCompteur() {
  compteur++;
  divCompteur.innerHTML = String(compteur);
}

btn.addEventListener("click", incrementCompteur);
