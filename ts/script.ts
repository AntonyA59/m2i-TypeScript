class Partie {
  scores: Score = { scoreJ1: 0, scoreJ2: 0 };
  j1: number = 0;
  j2: number = 0;
}

type Score = {
  scoreJ1: number;
  scoreJ2: number;
};

const player1Score = document.getElementById("player1Score")!;
const player2Score = document.getElementById("player2Score")!;

const pierre = document.getElementById("bPierre")!;
const feuille = document.getElementById("bFeuille")!;
const ciseaux = document.getElementById("bCiseaux")!;

const resultat = document.getElementById("resultat")!;

const imgJ1 = document.createElement("img");
const imgJ2 = document.createElement("img");
const pResult = document.createElement("p");

const imgs = ["img/rock.svg", "img/paper.svg", "img/scissors.svg"];
let partie: Partie = new Partie();

let play = function (choice: number) {
  partie.j1 = choice;
  partie.j2 = Math.ceil(Math.random() * 3);
  if (resultat) {
    resultat.innerHTML = "";
    pResult.className = "";
    imgJ1.src = imgs[partie.j1 - 1];
    imgJ2.src = imgs[partie.j2 - 1];
    resultat.appendChild(imgJ1);
    resultat.append(" - ");
    resultat.appendChild(imgJ2);

    if (
      (partie.j1 == 1 && partie.j2 == 3) ||
      (partie.j1 == 2 && partie.j2 == 1) ||
      (partie.j1 == 3 && partie.j2 == 2)
    ) {
      partie.scores.scoreJ1++;
      pResult.classList.add("win");
      pResult.innerText = "Gagné !";
    } else if (partie.j1 == partie.j2) {
      pResult.classList.add("draw");
      pResult.innerText = "Egalité !";
    } else {
      partie.scores.scoreJ2++;
      pResult.classList.add("lose");
      pResult.innerText = "Perdu !";
    }
    resultat.appendChild(pResult);
    updateScore(partie);
  }
};

pierre.addEventListener("click", function () {
  play(1);
});
feuille.addEventListener("click", function () {
  play(2);
});
ciseaux.addEventListener("click", function () {
  play(3);
});

function updateScore(partie: Partie) {
  player1Score.innerText = partie.scores.scoreJ1.toString();
  player2Score.innerText = partie.scores.scoreJ2.toString();
}
