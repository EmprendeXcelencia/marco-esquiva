const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreValue = document.getElementById('score-value');

let playerY = 50; // Posición inicial del jugador (porcentaje)
let score = 0; // Puntaje inicial
let obstaclesPassed = 0; // Contador de obstáculos superados

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowDown' && playerY > 0) {
        playerY -= 10;
    } else if (event.key === 'ArrowUp' && playerY < 90) {
        playerY += 10;
    }
    player.style.bottom = playerY + '%';
});

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.top = `${Math.floor(Math.random() * 260)}px`; // Posicionar al enemigo aleatoriamente en el eje Y
    gameContainer.appendChild(enemy);

    enemy.addEventListener('animationiteration', function() {
        obstaclesPassed++;
        score += 10;
        scoreValue.textContent = score;
        this.remove(); // Eliminar al enemigo cuando sale del área del juego
    });
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const enemies = document.querySelectorAll('.enemy');

    enemies.forEach(enemy => {
        const enemyRect = enemy.getBoundingClientRect();
        if (playerRect.left < enemyRect.left + enemyRect.width &&
            playerRect.left + playerRect.width > enemyRect.left &&
            playerRect.top < enemyRect.top + enemyRect.height &&
            playerRect.top + playerRect.height > enemyRect.top) {
            alert('¡Ya perdiste mano, suelta el celular!');
            resetGame();
        }
    });
}

function resetGame() {
    playerY = 50;
    player.style.bottom = playerY + '%';
    score = 0;
    scoreValue.textContent = score;
    obstaclesPassed = 0;
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => enemy.remove());
}

setInterval(createEnemy, 1500); // Crear un nuevo enemigo cada 1 segundos
setInterval(checkCollision, 100); // Comprobar colisiones cada 100ms
