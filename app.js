const grid = document.querySelector('.grille');
let playerPlace = 389;
let playerLaser = playerPlace;
var width = 20;
var height = 20;

for (var i = 0; i < 400 ; i++) {

    const grids = document.createElement('div');
    grid.appendChild(grids);

};

const grille = Array.from(document.querySelectorAll('.grille div'));

grille[playerPlace].classList.add('tireur');

/* Ennemis */

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

/* Laser */

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

/* Mouvement Ennemis */

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

            }, 400);
            
        };

    } else {

        AlienLeft();

        if (aliens.some(alien => alien % width === 0)) {

            direction = "right";

            setTimeout(() => {

                AlienDown();

            }, 400);

        };

    };
    
};

let aliensId = setInterval(MoveAlien, 800);

function checkForCollision() {

    for (let i = 0; i < aliens.length; i++) {

        if (playerPlace === aliens[i]) {

            clearInterval(laserID);
            clearInterval(aliensId);
            alert("Game Over");

        };

    };

    for (let i = 0; i < aliens.length; i++) {

        if (aliens[i] > 380) {

            clearInterval(laserID);
            clearInterval(aliensId);
            alert("Game Over");

        };

    };

};

let checkCollisionID = setInterval(checkForCollision, 100);

function shootLaser() {

    for (var i = 0; i < grille.length; i++) {

        if (grille[i].classList.contains('laser')) {

            grille[i].classList.remove('laser');
            laserEn = i - width;

            if (laserEn > -1) {

                grille[laserEn].classList.add('laser');

                // Check if the laser has collided with an alien

                if (aliens.includes(laserEn)) {

                    grille[laserEn].classList.remove('alien');
                    grille[laserEn].classList.remove('laser');

                    // Remove the alien from the aliens array
                    aliens.splice(aliens.indexOf(laserEn), 1);

                };

            };
            
        };

    };

};