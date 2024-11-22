/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '30px Georgia';
let gameSpeed = 1;
let canvasPosition = canvas.getBoundingClientRect();


let gameState = 'START';

let bubblesArray = []; /* Array für Bubble Particle System */

/* Buttons */
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const jumpBtn = document.getElementById('jumpBtn');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');


// Funktion für den Startbildschirm
function drawStartScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '30px Georgia';
    ctx.fillText('Klicke oder Tappe zum Starten', 20, 50);
}

// Funktion für den Endbildschirm
function drawGameOverScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '30px Georgia';
    ctx.fillText('GAME OVER', 20, 50);
    ctx.fillText('Dein Score: ' + score, 20, 100);
    ctx.fillText('Klicke oder Tappe zum Neustarten', 20, 150);
}

// Funktion zum Zurücksetzen des Spiels
function resetGame() {
    score = 0;
    gameFrame = 0;
    player.x = canvas.width;
    player.y = canvas.height/2;
    bubblesArray = [];
    
    // Anstatt neue Gegner zu erstellen, setzen Sie die vorhandenen zurück
    enemy1.x = canvas.width - 400 * Math.random();
    enemy1.y = Math.random() * (canvas.height - 150) + 90;
    enemy1.speed = Math.random() * 2 + 2;
    enemy1.active = false;

    enemy2.x = canvas.width - 400 * Math.random();
    enemy2.y = Math.random() * (canvas.height - 150) + 90;
    enemy2.speed = Math.random() * 2 + 2;
    enemy2.active = false;
}


/* Maus-Interaktion*/
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}

canvas.addEventListener('mousedown', function(event){
    mouse.click = true;
    mouse.x = event.x -  canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener('mouseup', function(event){
    mouse.click = false;

});


/* Verarbeitung von Touch-Eingaben */
document.getElementById('leftBtn').addEventListener('touchstart', () => {
    game.input.keys = ['ArrowLeft'];
});
document.getElementById('rightBtn').addEventListener('touchstart', () => {
    game.input.keys = ['ArrowRight'];
});
document.getElementById('jumpBtn').addEventListener('touchstart', () => {
    game.input.keys = ['ArrowUp'];
});
document.getElementById('leftBtn').addEventListener('touchend', () => {
    game.input.keys = [];
});
document.getElementById('rightBtn').addEventListener('touchend', () => {
    game.input.keys = [];
});
document.getElementById('jumpBtn').addEventListener('touchend', () => {
    game.input.keys = [];
});


/* Spiel starten - Toucheingabe */
startBtn.addEventListener('touchstart', () => {
    gameRunning = true;
    game.start();
});

/* Spiel neustarten - Toucheingabe */
restartBtn.addEventListener('touchstart', () => {
    gameRunning = true;
    game.restart(); 
});



/* Spielerklasse*/
const playerLeft = new Image();
playerLeft.src = '/games/playerfish.left.png';
const playerRight = new Image();
playerRight.src = '/games/playerfish.right.png';

class Player {
    constructor() {
        this.x = canvas.width; /* u.a. initial playermove beim ersten öffnen desSpiels - da das Spiel immer die Mauszeigerkoordinate mit der Position vergleicht*/
        this.y = canvas.height/2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
    }
    update() { /* update-method -  wir vergleichen Mausposition current mit der Spielerposition = onclick bewegt sich der Spieler dorthin */
        const dx = this.x - mouse.x;
        const dy = this.y -mouse.y;
        let theta = Math.atan2(dy, dx); /* Das ist die automatische kalkulation für die Rotation */
        this.angle = theta;
        if(mouse.x != this.x) {
            this.x -= dx/20; /* durch 30 dividiert da die Bewegung sonst gar nicht sichtbar wäre sondern fast instant */
        }                           /* ergo Einstellung Player Movement Speed ! */
        if(mouse.y != this.y) {
            this.y -= dy/30; /* durch 30 dividiert da die Bewegung sonst gar nicht sichtbar wäre sondern fast instant */
        }
    }
    draw() { /* draw-method - was wird eigentlich "gezeichnet" am canvas? also dargestellt */
        if (mouse.click) {
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
/*        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0 , Math.PI *2);
        ctx.fill();
        ctx.closePath(); */
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);
        if (this.x >= mouse.x){
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
                this.spriteWidth, this.spriteHeight, 0 -60 , 0 -45, this.spriteWidth/4, this.spriteHeight/4);
        } else {
                ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
                    this.spriteWidth, this.spriteHeight, 0 -60 , 0 -45, this.spriteWidth/4, this.spriteHeight/4);
        }
        ctx.restore();


    }
}

/* die Klasse ist deklared - nun  kreieren wir eine Instanz hieraus - um sie darzustellen - mit den angegebenen Verhalten/Eigenschaften aus der Klasse */
const player = new Player();
const bubbleImage = new Image();
bubbleImage.src = '/games/bubble_fruits.png';


class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * canvas.height;
        this.radius = 50;
        this.speed = Math.random() * 1 + .5;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 512; // Annahme: Dein Spritesheet hat 512x512 Pixel pro Frame
        this.spriteHeight = 512;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    }
    update() {
        this.y -= this.speed;
        if (this.y < 0 - this.radius * 2) {
            this.y = canvas.height + Math.random() * canvas.height;
            this.x = Math.random() * canvas.width;
        }
        if (gameFrame % 200 == 0) {
            this.frameX++;
            if (this.frameX >= 7) this.frameX = 0;
        }
        this.y -= this.speed; /* Bubbles bewegen sich nach oben in y Richtung - abhängig von der speed-value */
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy); /* Rechtwinkliges Dreieck! - Nutzung von Satz des Pythagoras */
    }
    draw() {
 /*       ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        ctx.fill();
        ctx.closePath(); */
        ctx.drawImage(bubbleImage, 
            this.frameX * this.spriteWidth, 0, 
            this.spriteWidth, this.spriteHeight, 
            this.x - this.radius, this.y - this.radius, 
            this.radius * 2, this.radius * 2);
    }
}

const bubblePop1 = document.createElement('audio');
bubblePop1.src = '/games/bubbleSound1.wav';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = '/games/bubbleSound2.wav';



function handleBubbles() {
    if (gameFrame % 50 == 0) {
        bubblesArray.push(new Bubble());
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
            bubblesArray.splice(i, 1);
            i--;
        } else if (bubblesArray[i] && bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {
            if(!bubblesArray[i].counted) {
                if (bubblesArray[i].sound == 'sound1'){
                    bubblePop1.play();
                } else {
                    bubblePop2.play();
                }
                score++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i, 1);
                i--;
            }
        }
    }
}



/* Hintergrund */
const background = new Image();
background.src = '/games/underwater1.jpg';


function handleBackground() {
    ctx.drawImage(background, 0,0, canvas.width, canvas.height);
}


/* Gegner / Enemies */
const enemyImage1 = new Image();
enemyImage1.src = '/games/enemy_donuts1.png'
const enemyImage2 = new Image();
enemyImage2.src = '/games/enemy_donuts2.png'

class Enemy {
    constructor(image) {
        this.x = canvas.width - 400 * Math.random();
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 60;
        this.speed = Math.random() * 2 + 2;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 544;
        this.spriteHeight = 457;
        this.image = image;
        this.speed = 1 * Math.random()*2;
        this.active = false; /* verzögerter Start */
    }
    draw() {
/*        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill(); */
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, this.x - 50, this.y - 50, this.spriteWidth / 5, this.spriteHeight / 5);
    }
    update() {
        if (!this.active) return; // Wenn nicht aktiv, keine Aktualisierung

        this.x -= this.speed;
        if (this.x < 0 - this.radius * 2) {
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 100;
            this.speed = Math.random() * 2 + 2;
        }
        /* if Statement wird alle 5 Frames true = modulars 5 */
        if (gameFrame % 100 == 0) {
            this.frameX++;
            if (this.frameX >= 4) this.frameX = 0;
        }
        /* Player-Enemy-Collision */
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < this.radius + player.radius) {
            handleGameOver();
        }
    }
}

const enemy1 = new Enemy(enemyImage1);
const enemy2 = new Enemy(enemyImage2);

function handleEnemies() {
    if (gameFrame > 300) { // Starte Gegner nach 5 Sekunden (300 Frames bei 60 FPS)
        enemy1.active = true;
        enemy2.active = true;
    }
    enemy1.update();
    enemy1.draw();
    enemy2.update();
    enemy2.draw();
}

function handleGameOver() {
    gameState = 'GAMEOVER';
}





/* Animation Loop */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    handleBackground();  // Zeichne immer den Hintergrund
    
    if (gameState === 'START') {
        drawStartScreen();
    } else if (gameState === 'PLAYING') {
        handleBubbles();
        player.update();
        player.draw();
        handleEnemies();
        ctx.fillStyle = 'white';
        ctx.fillText('SCORE: ' + score, 20, 50);
        gameFrame++;
    } else if (gameState === 'GAMEOVER') {
        drawGameOverScreen();
    }
    
    requestAnimationFrame(animate);
}



canvas.addEventListener('click', function(event) {
    console.log('Click detected, current gameState:', gameState);
    if (gameState === 'START') {
        gameState = 'PLAYING';
        console.log('Changing gameState to PLAYING');
    } else if (gameState === 'GAMEOVER') {
        resetGame();
        gameState = 'PLAYING';
        console.log('Game reset, changing gameState to PLAYING');
    }
});

/* Resizing damit das  Offset wieder stimmt wenn das Fenster in der Größe verändert wird! - keine neue Variable wir updaten die existierende vom Angang nur */
function handleResize() {
    canvasPosition = canvas.getBoundingClientRect();

window.addEventListener('resize', handleResize);
}

handleResize();
animate();

