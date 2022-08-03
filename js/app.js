let wins = 0;
let numWins = document.querySelector('.counter');
let newGame = document.querySelector('.restart');
let livesList = document.getElementsByClassName('live');
let liveBlock = document.querySelector('.lives');
let modal = document.querySelector('#myModal');
let span = document.querySelector('.close');
let content = document.querySelector('p');
// Enemies our player must avoid
var Enemy = function (x, y, v) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;//!!!
    this.y = y;//!!!
    this.v = v;//!!!

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    this.x += this.v * dt;//!!!
    if (this.x > 500) {
        this.x = -200;
    }
    if (player.x < this.x + 50 && player.x > this.x - 50 && player.y < this.y + 50 && player.y > this.y - 50) {
        player.x = 200;
        player.y = 400;
        liveBlock.removeChild(livesList[0]);
        if (livesList.length === 0) {
            modal.style.display = "block";
            content.textContent = 'YOU LOOSE:(((((';
            span.addEventListener('click', function newGame() {
                modal.style.display = "none";
                restartGame();
            });
    
        }
    }
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y,) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }
    update() {
        if (this.x > 402) {
            this.x = 402;
        }
        if (this.x < 1) {
            this.x = 1;
        }
        if (this.y > 400) {
            this.y = 400;
        }
        if (this.y < 2) {
            wins++;
            this.y = 400;
            numWins.innerHTML = wins;
            if (wins >= 5) {
                modal.style.display = "block";
                 content.textContent='YOU WIN';
                content.style.color = 'green';
                span.addEventListener('click', function newGame(){
                    modal.style.display = "none";
                    restartGame();
                });
            }
        }

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keys) {
        switch (keys) {
            case "left": this.x -= 101;
                break;
            case "right": this.x += 101;
                break;
            case "up": this.y -= 90;
                break;
            case "down": this.y += 90;
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player(200, 400);
function randomCoordinates(){
for (let i = 0; i < 3; i++) {
    let y = [55, 145, 225]
    let v = [70, 130, 200];
    let x = [-101, -202, -50];
    let randV = randomIntFromInterval(0, 2);
    let randX = randomIntFromInterval(0, 2);
    let randY = randomIntFromInterval(0, 2);
    const enemy = new Enemy(x[randX], y[randY], v[randV]);
    allEnemies.push(enemy);
}
}
randomCoordinates();
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        "ArrowLeft": 'left',//переписать
        "ArrowUp": 'up',
        "ArrowRight": 'right',
        "ArrowDown": 'down'
    };

    player.handleInput(allowedKeys[e.key]);
});
newGame.addEventListener('click', restartGame);

function restartGame() {
    wins = 0;
    numWins.innerHTML = wins;
    player.x = 200;
    player.y = 400;
    allEnemies.length=0;
    randomCoordinates();
    if (livesList.length !== 3) {
        liveBlock.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            let newLive = document.createElement('img');
            newLive.src = 'images/Heart.png';
            newLive.classList.add('live');
            liveBlock.appendChild(newLive);
        }
    }
}