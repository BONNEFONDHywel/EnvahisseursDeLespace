const grid = document.querySelector('.grille');
var playerPlace = 389;
var playerLaser = playerPlace - 20;
var width;
var height;

for (var i = 0; i < 400 ; i++) {

    const grids = document.createElement('div');
    grid.appendChild(grids);

};

const player = Array.from(document.querySelectorAll('.grille div'));

player[playerPlace].classList.add('tireur');

/* Ennemis */

const ennemis = Array.from(document.querySelectorAll('.grille div'));

const aliens = [
    0,1,2,3,4,5,6,7,8,9,10,11,
    20,21,22,23,24,25,26,27,28,29,30,31,
    40,41,42,43,44,45,46,47,48,49,50,51
]

function draw(){
    for(let i = 0; i < aliens.length; i++){
        ennemis[aliens[i]].classList.add("alien")
    }
}
draw()



/* Laser */
const laser = Array.from(document.querySelectorAll('.grille div'));

function moveLaser() {
    laser[playerLaser].classList.add('laser');
    while (playerLaser > 9) {
        laser[playerLaser].classList.remove('laser');
        playerLaser -= 20;
        laser[playerLaser].classList.add('laser');
    }
    laser[playerLaser].classList.remove('laser');
}

document.addEventListener("keydown", function(event) {

    switch(event.code){

        case "ArrowLeft":

            moveLaser();

            player[playerPlace].classList.remove('tireur');
            playerPlace -= 1;

            if (playerPlace < 340 || playerPlace == 359 || playerPlace == 379) {

                playerPlace += 1;

            };

            player[playerPlace].classList.add('tireur');
            break;
        
        case "ArrowRight":

            player[playerPlace].classList.remove('tireur');
            playerPlace += 1;

            if (playerPlace > 399 || playerPlace == 360 || playerPlace == 380) {

                playerPlace -= 1;

            };

            player[playerPlace].classList.add('tireur');
            break;

        case "ArrowUp":

            player[playerPlace].classList.remove('tireur');
            playerPlace -= 20;

            if (playerPlace < 340) {

                playerPlace += 20;

            };

            player[playerPlace].classList.add('tireur');
            break;

        case "ArrowDown":

            player[playerPlace].classList.remove('tireur');
            playerPlace += 20;

            if (playerPlace > 399) {

                playerPlace -= 20;
            };

            player[playerPlace].classList.add('tireur');
            break;

    };
    
});

/* Mouvement Ennemis */
function deleteInvaders(){
    for(let i = 0; i < aliens.length; i++){
        ennemis[aliens[i]].classList.remove("alien")
    }
}


function AlienRight(){
    deleteInvaders()

    for(let i = 0; i < aliens.length; i++){
        aliens[i] += 1;
        ennemis[aliens[i]].classList.add("alien");
    }
}

function AlienLeft(){
    deleteInvaders()

    for(let i = 0; i < aliens.length; i++){
        aliens[i] -= 1;
        ennemis[aliens[i]].classList.add("alien");
    }
}

function AlienDown(){
    deleteInvaders()

    for(let i = 0; i < aliens.length; i++){
        aliens[i] += 20;
        ennemis[aliens[i]].classList.add("alien");
    }
}


let direction = "right";

function MoveAlien() {
    if (direction === "right") {
        AlienRight();
        if (aliens.some(alien => (alien + 1) % width === 0)) {
            direction = "left";
            setTimeout(() => {
                AlienDown();
            }, 800);
        }

    } else {
        AlienLeft();
        if (aliens.some(alien => alien % width === 0)) {
            direction = "right";
            setTimeout(() => {
                AlienDown();
            }, 800);
        }
    }
}

let aliensId = setInterval(MoveAlien, 800);
