const grid = document.querySelector('.grille');
var playerPlace = 389;

for (var i = 0; i < 400 ; i++) {
    const grids = document.createElement('div');
    grid.appendChild(grids);
}

const player = Array.from(document.querySelectorAll('.grille div'));

player[playerPlace].classList.add('tireur');