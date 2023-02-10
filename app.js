/* Définition de plusieurs variables */

const grid = document.querySelector('.grille');
let playerPlace = 389;
let playerLaser = playerPlace;
var width = 20;
var height = 20;
let score = 0;
const scoreDisplay = document.querySelector("#score");
let winInterval;
let loseInterval;

/* Création de la grille */

for (var i = 0; i < 400 ; i++) {

    const grids = document.createElement('div');
    grid.appendChild(grids);

};

const grille = Array.from(document.querySelectorAll('.grille div'));
grille[playerPlace].classList.add('tireur');

/* Création d'ennemis */

const aliens = [

    0,1,2,3,4,5,6,7,8,9,10,11,
    20,21,22,23,24,25,26,27,28,29,30,31,
    40,41,42,43,44,45,46,47,48,49,50,51

];

function draw() {

    for(let i = 0; i < aliens.length; i++){

        grille[aliens[i]].classList.add("alien");

    };

};

draw();

/* Création du laser */

const laser = Array.from(document.querySelectorAll('.grille div'));

function shootLaser() {

    for(var i = 0; i < grille.length; i++) {

        if(grille[i].classList.contains('laser')) {

            grille[i].classList.remove('laser');
            laserEn = i - width;

            if (laserEn > -1) {

                grille[laserEn].classList.add('laser');

            };

        };

    };

};

/* Déplacement du joueur et du laser qui va avec, en utilisant les touches du claviers (flèches directionnelles et espace) */

function move() {

    document.addEventListener("keydown", function(event) {

        switch(event.code) {

            case "ArrowLeft":

                grille[playerPlace].classList.remove('tireur');
                playerPlace -= 1;
                playerLaser -= 1;

                if (playerPlace < 340 || playerPlace == 359 || playerPlace == 379) {

                    playerPlace += 1;
                    playerLaser += 1;

                };

                grille[playerPlace].classList.add('tireur');
                break;
            
            case "ArrowRight":

                grille[playerPlace].classList.remove('tireur');
                playerPlace += 1;
                playerLaser += 1;

                if (playerPlace > 399 || playerPlace == 360 || playerPlace == 380) {

                    playerPlace -= 1;
                    playerLaser -= 1;

                };

                grille[playerPlace].classList.add('tireur');
                break;

            case "ArrowUp":

                grille[playerPlace].classList.remove('tireur');
                playerPlace -= 20;
                playerLaser -= 20;

                if (playerPlace < 340) {

                    playerPlace += 20;
                    playerLaser += 20;

                };

                grille[playerPlace].classList.add('tireur');
                break;

            case "ArrowDown":

                grille[playerPlace].classList.remove('tireur');
                playerPlace += 20;
                playerLaser += 20;

                if (playerPlace > 399) {

                    playerPlace -= 20;
                    playerLaser -= 20;

                };

                grille[playerPlace].classList.add('tireur');
                break;

            case "Space":

                grille[playerLaser-20].classList.add('laser');

        };
        
    });

};

move();
let laserID = setInterval(shootLaser, 100);

/* Déplacements des ennemis */

function deleteInvaders() {

    for(let i = 0; i < aliens.length; i++) {

        grille[aliens[i]].classList.remove("alien");

    };

};

function AlienRight() {

    deleteInvaders();

    for(let i = 0; i < aliens.length; i++) {

        aliens[i] += 1;
        grille[aliens[i]].classList.add("alien");

    };

};

function AlienLeft() {

    deleteInvaders();

    for(let i = 0; i < aliens.length; i++){

        aliens[i] -= 1;
        grille[aliens[i]].classList.add("alien");

    };

};

function AlienDown() {

    deleteInvaders();

    for(let i = 0; i < aliens.length; i++){

        aliens[i] += 20;
        grille[aliens[i]].classList.add("alien");

    };

};


let direction = "right";

function MoveAlien() {

    if (direction === "right") {

        AlienRight();

        if (aliens.some(alien => (alien + 1) % width === 0)) {

            direction = "left";

            setTimeout(() => {

                AlienDown();

            }, 200);
            
        };

    } else {

        AlienLeft();

        if (aliens.some(alien => alien % width === 0)) {

            direction = "right";

            setTimeout(() => {

                AlienDown();

            }, 200);

        };

    };
    
};

let aliensId = setInterval(MoveAlien, 400);

/* Conditions de défaite */

let defeat = false;

loseInterval = setInterval(function() {

    for (let i = 0; i < aliens.length; i++) {

        if (!defeat && playerPlace === aliens[i]) {

            clearInterval(laserID);
            clearInterval(aliensId);
            showLoseScreen();
            defeat = true;
            clearInterval(loseInterval);
            
        };

    };

    for (let i = 1; i < aliens.length; i++) {

        if (!defeat && aliens[i] > 380) {

            clearInterval(laserID);
            clearInterval(aliensId);
            showLoseScreen();
            defeat = true;
            clearInterval(loseInterval);

        };

    };

}, 100);


/* Conditions de victoire */

let victory = false;

winInterval = setInterval(function() {

    if (!victory && !grille.some(grid => grid.classList.contains("alien"))) {

        clearInterval(laserID);
        clearInterval(aliensId);
        showWinScreen();
        victory = true;
        clearInterval(winInterval);

    }

    if (!victory && aliens.length === 0 && !gameStopped) {

        clearInterval(winInterval);

    }

}, 100);


/* Collision entre l'ennemi et le laser */

function shootLaser() {

    for (var i = 0; i < grille.length; i++) {

        if (grille[i].classList.contains('laser')) {

            grille[i].classList.remove('laser');
            laserEn = i - width;

            if (laserEn > -1) {

                grille[laserEn].classList.add('laser');

                if (aliens.includes(laserEn)) {

                    score += 100;
                    scoreDisplay.textContent = "Score: " + score;
                    grille[laserEn].classList.remove('alien');
                    grille[laserEn].classList.remove('laser');
                    aliens.splice(aliens.indexOf(laserEn), 1);


                };

            };
            
        };

    };

};

/* Fonction pour la victoire */

function showWinScreen() {

    let winScreen = document.createElement("div");
    winScreen.innerHTML = "Bien joué, tu as gagné !<br><br>" +
      "<button onclick='location.reload();'>Replay</button>" +
      "<button onclick='window.history.back();'>Quit</button>";
    document.body.appendChild(winScreen);

};

/* Fonction pour la défaite */
  
function showLoseScreen() {

    let loseScreen = document.createElement("div");
    loseScreen.innerHTML = "Tu as perdu !<br><br>" +
      "<button onclick='location.reload();'>Replay</button>" +
      "<button onclick='window.history.back();'>Quit</button>";
    document.body.appendChild(loseScreen);

};