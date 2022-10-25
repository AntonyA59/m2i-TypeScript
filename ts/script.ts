type Score = {
  scoreJ1: number;
  scoreJ2: number;
};
class Partie {
  scores: Score = { scoreJ1: 0, scoreJ2: 0 };
  j1: number = 0;
  j2: number = 0;

  play(choice: number) {
    this.j1 = choice;
    this.j2 = Math.ceil(Math.random() * 3);
  }
}

class Manager {
  partie: Partie = new Partie();
  parties: Array<Partie> = new Array<Partie>();
  tour: number = 0;
  nbrTour: number = 0;

  player1Score = document.getElementById("player1Score")!;
  player2Score = document.getElementById("player2Score")!;

  pierre = document.getElementById("bPierre")!;
  feuille = document.getElementById("bFeuille")!;
  ciseaux = document.getElementById("bCiseaux")!;

  resultat = document.getElementById("resultat")!;
  historique = document.getElementById("historique")!;

  imgJ1 = document.createElement("img");
  imgJ2 = document.createElement("img");

  pResult = document.createElement("p");
  pFinalResult = document.createElement("p");

  imgs = ["img/rock.svg", "img/paper.svg", "img/scissors.svg"];

  constructor(nbrTour: number) {
    this.nbrTour = nbrTour;
    this.handleClick();
  }

  handleClick() {
    this.pierre.addEventListener("click", () => {
      this.partie.play(1);
      this.event();
    });
    this.feuille.addEventListener("click", () => {
      this.partie.play(2);
      this.event;
    });
    this.ciseaux.addEventListener("click", () => {
      this.partie.play(3);
      this.event();
    });
  }

  event() {
    this.tour++;
    this.result();
    this.updateScore(this.partie);
    if (this.tour >= this.nbrTour) {
      if (this.partie.j1 > this.partie.j2) {
        this.pResult.innerText = "Bravo vous avez gagné !";
      } else if (this.partie.j1 === this.partie.j2) {
        this.pResult.innerText = "Draw!";
      } else {
        this.pResult.innerText = "Dommage Vous avez perdu !";
      }
      this.parties.push(this.partie);
      this.addhistory();
      this.tour = 0;
      this.resetScore();
      this.resultat.appendChild(this.pFinalResult);
    }
  }

  result() {
    if (this.resultat) {
      this.resultat.innerHTML = "";
      this.pResult.className = "";
      this.imgJ1.src = this.imgs[this.partie.j1 - 1];
      this.imgJ2.src = this.imgs[this.partie.j2 - 1];
      this.resultat.appendChild(this.imgJ1);
      this.resultat.append(" - ");
      this.resultat.appendChild(this.imgJ2);

      if (
        (this.partie.j1 == 1 && this.partie.j2 == 3) ||
        (this.partie.j1 == 2 && this.partie.j2 == 1) ||
        (this.partie.j1 == 3 && this.partie.j2 == 2)
      ) {
        this.partie.scores.scoreJ1++;
        this.pResult.classList.add("win");
        this.pResult.innerText = "Gagné !";
      } else if (this.partie.j1 == this.partie.j2) {
        this.pResult.classList.add("draw");
        this.pResult.innerText = "Egalité !";
      } else {
        this.partie.scores.scoreJ2++;
        this.pResult.classList.add("lose");
        this.pResult.innerText = "Perdu !";
      }
      this.resultat.appendChild(this.pResult);
    }
  }

  addhistory() {
    const pHistory = document.createElement("p");
    this.parties.forEach((element) => {
      pHistory.innerText =
        "Joueur " +
        element.scores.scoreJ1 +
        " - Ordinateur " +
        element.scores.scoreJ2;
    });
    this.historique.appendChild(pHistory);
  }

  updateScore(partie: Partie) {
    this.player1Score.innerText = partie.scores.scoreJ1.toString();
    this.player2Score.innerText = partie.scores.scoreJ2.toString();
  }

  resetScore() {
    this.partie.scores.scoreJ1 = 0;
    this.partie.scores.scoreJ2 = 0;
    this.updateScore(this.partie);
  }
}

let manager: Manager = new Manager(4);
