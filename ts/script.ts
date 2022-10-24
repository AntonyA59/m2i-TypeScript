let compteur: number = 0;
let divCompteur: HTMLElement | null = document.getElementById("compteur");
let btn: HTMLElement | null = document.getElementById("btn");
btn?.addEventListener("click", incrementCompteur);

function incrementCompteur() {
  compteur++;
  if (divCompteur) {
    divCompteur.innerHTML = String(compteur);
  }
}
