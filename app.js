const grid = document.querySelector('.grille');
var playerPlace = 389;
var width;
var height;

for (var i = 0; i < 400 ; i++) {
    const grids = document.createElement('div');
    grid.appendChild(grids);
};

const player = Array.from(document.querySelectorAll('.grille div'));

player[playerPlace].classList.add('tireur');

document.addEventListener("keydown", function(event) {
    switch(event.code){
        case "ArrowLeft":
            player[playerPlace].classList.remove('tireur');
            playerPlace -=1;
            player[playerPlace].classList.add('tireur');
            break;
        
        case "ArrowRight":
            player[playerPlace].classList.remove('tireur');
            playerPlace +=1;
            player[playerPlace].classList.add('tireur');
            break;

        case "ArrowUp":
            player[playerPlace].classList.remove('tireur');
            playerPlace -= 20;
            player[playerPlace].classList.add('tireur');
            break;

        case "ArrowDown":
            player[playerPlace].classList.remove('tireur');
            playerPlace += 20;
            player[playerPlace].classList.add('tireur');
            break;
    };
});