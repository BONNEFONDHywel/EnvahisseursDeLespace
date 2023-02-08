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

function shootLaser() {

    for(var i = 0; i < grille.length; i++){

        if(grille[i].classList.contains('laser')) {

            grille[i].classList.remove('laser');
            laserEn = i - width;

            if (laserEn > -1) {

                grille[laserEn].classList.add('laser');

            };

        };

    };

};

document.addEventListener("keydown", function(event) {

    switch(event.code){

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

/* Ennemis */

const alien = Array.from(document.querySelectorAll('.grille div'));

const aliens = [

    0,1,2,3,4,5,6,7,8,9,10,11,
    20,21,22,23,24,25,26,27,28,29,30,31,
    40,41,42,43,44,45,46,47,48,49,50,51

];

function draw(){

    for(let i = 0; i < aliens.length; i++){

        alien[aliens[i]].classList.add("alien");

    };

};

draw();

setInterval(shootLaser, 100);