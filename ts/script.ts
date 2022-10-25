type Score = {
  scoreJ1: number;
  scoreJ2: number;
};
class Partie {
  scores: Score = { scoreJ1: 0, scoreJ2: 0 };
  j1: number = 0;
  j2: number = 0;

  play(choice: number, manager: Manager) {
    this.j1 = choice;
    this.j2 = Math.ceil(Math.random() * 3);
    if (manager.resultat) {
      manager.resultat.innerHTML = "";
      manager.pResult.className = "";
      manager.imgJ1.src = manager.imgs[manager.partie.j1 - 1];
      manager.imgJ2.src = manager.imgs[manager.partie.j2 - 1];
      manager.resultat.appendChild(manager.imgJ1);
      manager.resultat.append(" - ");
      manager.resultat.appendChild(manager.imgJ2);

      if (
        (manager.partie.j1 == 1 && manager.partie.j2 == 3) ||
        (manager.partie.j1 == 2 && manager.partie.j2 == 1) ||
        (manager.partie.j1 == 3 && manager.partie.j2 == 2)
      ) {
        manager.partie.scores.scoreJ1++;
        manager.afficherMessageResultat("win", "Gagné");
      } else if (manager.partie.j1 == manager.partie.j2) {
        manager.afficherMessageResultat("draw", "Egalité");
      } else {
        manager.partie.scores.scoreJ2++;
        manager.afficherMessageResultat("lose", "Perdu !");
      }
      manager.resultat.appendChild(manager.pResult);
    }
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

  imgs = ["img/rock.svg", "img/paper.svg", "img/scissors.svg"];

  constructor(nbrTour: number) {
    this.nbrTour = nbrTour;
    this.handleClick();
  }

  handleClick() {
    this.pierre.addEventListener("click", () => {
      this.partie.play(1, this);
      this.event();
    });
    this.feuille.addEventListener("click", () => {
      this.partie.play(2, this);
      this.event();
    });
    this.ciseaux.addEventListener("click", () => {
      this.partie.play(3, this);
      this.event();
    });
  }

  afficherMessageResultat(classname: string, text: string) {
    manager.pResult.classList.add(classname);
    manager.pResult.innerText = text;
  }
  event() {
    this.tour++;
    this.updateScore(this.partie);
    if (this.tour >= this.nbrTour) {
      if (this.partie.scores.scoreJ1 > this.partie.scores.scoreJ2) {
        this.afficherMessageResultat("win", "Bravo vous avez gagné !");
      } else if (this.partie.scores.scoreJ1 === this.partie.scores.scoreJ2) {
        this.afficherMessageResultat("draw", "Draw!");
      } else {
        this.afficherMessageResultat("lose", "Dommage Vous avez perdu !");
      }
      this.parties.push(this.partie);
      this.addhistory();
      this.tour = 0;
      this.resetScore();
      this.resultat.appendChild(this.pResult);
    }
  }

  addhistory() {
    const pHistory = document.createElement("p");
    this.parties.forEach((element) => {
      let text = "";
      if (this.partie.scores.scoreJ1 > this.partie.scores.scoreJ2) {
        text = "Gagné";
      } else if (this.partie.scores.scoreJ1 === this.partie.scores.scoreJ2) {
        text = "Egalité";
      } else {
        text = "Perdue";
      }

      pHistory.innerText =
        "Joueur " +
        element.scores.scoreJ1 +
        " - Ordinateur " +
        element.scores.scoreJ2 +
        " | " +
        text;
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
