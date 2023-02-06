const grid = document.querySelector('.grille');

for (var i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}