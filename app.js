const grid = document.querySelector('.grille');
var playerPlace = 389;
var playerLaser = playerPlace;
var width;
var height;

for (var i = 0; i < 400 ; i++) {

    const grids = document.createElement('div');
    grid.appendChild(grids);

};

const player = Array.from(document.querySelectorAll('.grille div'));

player[playerPlace].classList.add('tireur');

const laser = Array.from(document.querySelectorAll('.grille div'));

function moveLaser() {
    laser[playerLaser].classList.add('laser');
    while (playerLaser > 20) {
        laser[playerLaser].classList.remove('laser');
        playerLaser -= 20;
        laser[playerLaser].classList.add('laser');
    }
}

document.addEventListener("keydown", function(event) {

    switch(event.code){

        case "ArrowLeft":

            player[playerPlace].classList.remove('tireur');
            playerPlace -= 1;
            playerLaser -= 1;

            if (playerPlace < 340 || playerPlace == 359 || playerPlace == 379) {

                playerPlace += 1;
                playerLaser += 1;

            };

            player[playerPlace].classList.add('tireur');
            break;
        
        case "ArrowRight":

            player[playerPlace].classList.remove('tireur');
            playerPlace += 1;
            playerLaser += 1;

            if (playerPlace > 399 || playerPlace == 360 || playerPlace == 380) {

                playerPlace -= 1;
                playerLaser -= 1;

            };

            player[playerPlace].classList.add('tireur');
            break;

        case "ArrowUp":

            player[playerPlace].classList.remove('tireur');
            playerPlace -= 20;
            playerLaser -= 20;

            if (playerPlace < 340) {

                playerPlace += 20;
                playerLaser += 20;

            };

            player[playerPlace].classList.add('tireur');
            break;

        case "ArrowDown":

            player[playerPlace].classList.remove('tireur');
            playerPlace += 20;
            playerLaser += 20;

            if (playerPlace > 399) {

                playerPlace -= 20;
                playerLaser -= 20;
            };

            player[playerPlace].classList.add('tireur');
            break;

        case "Space":

            moveLaser();

    };

});