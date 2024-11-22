const canvas = document.getElementById("canvas2");
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 720;

let gameSpeed = 0.5;

// Herz-Icons
const heart = document.getElementById('heartImage');


/* Buttons */
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const jumpBtn = document.getElementById('jumpBtn');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');


/* Klasse für Plattformen */
class Platform {
    constructor(game, image) {
        this.game = game;
        this.width = 200;
        this.height = 40;
        this.x = this.game.gameWidth;
        this.y = Math.random() * (this.game.gameHeight - this.height - 400) + 200;
        this.image = image;
        this.speedX = 1;
        this.markedForDeletion = false;
    }

    update() {
        this.x -= this.speedX + this.game.speed;
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

/* Klasse für den Hintergrund */
class Background {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 1200;
        this.height = 720;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

/* Referenzierung der Hintergrundbilder durch IDs */
const backgroundLayer1 = document.getElementById('layer-1');
const backgroundLayer2 = document.getElementById('layer-2');
const backgroundLayer3 = document.getElementById('layer-3');
const backgroundLayer4 = document.getElementById('layer-4');
const backgroundLayer5 = document.getElementById('layer-5');
const backgroundLayer6 = document.getElementById('layer-6');

/* Erstellen der Background-Layer mit verschiedenen Geschwindigkeiten */
const layer1 = new Background(backgroundLayer1, 0.2);
const layer2 = new Background(backgroundLayer2, 0.4);
const layer3 = new Background(backgroundLayer3, 0.6);
const layer4 = new Background(backgroundLayer4, 0.8);
const layer5 = new Background(backgroundLayer5, 1);
const layer6 = new Background(backgroundLayer6, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5, layer6];

/* Klasse zur Verarbeitung von Tastatureingaben */
class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' ||
                 e.key === 'ArrowUp' ||
                 e.key === 'ArrowLeft' ||
                 e.key === 'ArrowRight') &&
                this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}


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





/* Klasse für den Spieler */
class Player {
    constructor(gameWidth, gameHeight, image) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 306;
        this.height = 402;
        this.x = 0;
        this.scale = 0.3;
        this.y = this.gameHeight - this.height * this.scale; // Startposition angepasst
        this.image = image;
        this.frameX = 0;
        this.frameY = 0;
        this.maxRunFrame = 3;
        this.maxJumpFrame = 2;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.speed = 0;
        this.vy = 0;
        this.weight = 0.4;
        this.lives = 3;
        this.invulnerable = false;
        this.invulnerableTimer = 0;
        this.invulnerableDuration = 1000;
        this.onPlatform = false;

        // Debug-Ausgabe
        console.log("Player Y:", this.y);
        console.log("Game Height:", this.gameHeight);
        console.log("Player Height:", this.height);
        console.log("Player Scale:", this.scale);
    }

    draw(context) {
        const scaledWidth = this.width * this.scale;
        const scaledHeight = this.height * this.scale;
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
            this.width, this.height, this.x, this.y, scaledWidth, scaledHeight);

        // Anzeige der Leben
        context.fillStyle = "black";
        context.font = "20px Arial";
        context.fillText("Leben:", 40, 30);
        for (let i = 0; i < this.lives; i++) {
            context.drawImage(heart, 80 + i * 30, 10, 25, 25);
        }
    }

    update(input, deltaTime, platforms, enemies) {
        // Frame-Animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameY === 0) {
                if (this.frameX < this.maxRunFrame) this.frameX++;
                else this.frameX = 0;
            } else if (this.frameY === 1) {
                if (this.frameX < this.maxJumpFrame) this.frameX++;
                else this.frameX = 0;
            }
        } else {
            this.frameTimer += deltaTime;
        }
    
        // Bewegung und Logik
        if (input.keys.indexOf('ArrowRight') > -1) {
            this.speed = 4;
            if (this.onGround() || this.onPlatform) this.frameY = 0;
        } else if (input.keys.indexOf('ArrowLeft') > -1) {
            this.speed = -4;
            if (this.onGround() || this.onPlatform) this.frameY = 0;
        } else if (input.keys.indexOf('ArrowUp') > -1 && (this.onGround() || this.onPlatform)) {
            this.vy -= 20;
            this.frameY = 1;
            this.frameX = 0;
            // Springen Sound abspielen
            document.getElementById('jumpSound').play();
        } else {
            this.speed = 0;
        }
    
        // Horizontale Bewegung
        this.x += this.speed;
        if (this.x < 0) this.x = 0;
        else if (this.x > this.gameWidth - this.width * this.scale) this.x = this.gameWidth - this.width * this.scale;
    
        // Vertikale Bewegung
        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight;
            this.frameY = 1; // Sprung-Animation
        } else {
            this.vy = 0;
        }

        // Begrenzung der vertikalen Position
        const scaledHeight = this.height * this.scale;
        const maxY = this.gameHeight - scaledHeight;
        if (this.y > maxY) {
            this.y = maxY;
        }
    
        // Plattform-Kollision
        this.onPlatform = false;
        platforms.forEach(platform => {
            if (
                this.x + this.width * this.scale > platform.x &&
                this.x < platform.x + platform.width &&
                Math.abs(this.y + this.height * this.scale - platform.y) < 5 && // Toleranzbereich
                this.vy >= 0 // Nur wenn der Spieler fällt oder steht
            ) {
                this.y = platform.y - this.height * this.scale;
                this.vy = 0;
                this.onPlatform = true;
            }
        });
    
        // Kollisionsprüfung mit Gegnern und Verlust von Leben
        if (!this.invulnerable) {
            enemies.forEach(enemy => {
                if (this.isCollidingWith(enemy)) {
                    this.lives--; // Leben reduzieren
                    enemy.markedForDeletion = true;
                    this.invulnerable = true;
                    this.invulnerableTimer = 0;
                    // Kollisions-Sound abspielen
                    document.getElementById('enemyCollisionSound').play();
                }
            });
        } else {
            this.invulnerableTimer += deltaTime;
            if (this.invulnerableTimer >= this.invulnerableDuration) {
                this.invulnerable = false;
            }
        }
    }

    onGround() {
        return this.y >= this.gameHeight - this.height * this.scale - 1; // Toleranz hinzugefügt
    }

    isCollidingWith(enemy) {
        return (
            this.x < enemy.x + enemy.width * enemy.scale &&
            this.x + this.width * this.scale > enemy.x &&
            this.y < enemy.y + enemy.height * enemy.scale &&
            this.y + this.height * this.scale > enemy.y
        );
    }
}

/* Klasse für den Gegner / Enemy */
class Enemy {
    constructor(game, width, height, image, scale = 1, speedX = 3, speedY = 0) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.x = this.game.gameWidth;
        this.y = 0;
        this.image = image;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.scale = scale;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update(deltaTime) {
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY - this.game.speed;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.x + this.width * this.scale < 0) this.markedForDeletion = true;
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
    }
}

class SandwichEnemy extends Enemy {
    constructor(game) {
        super(game, 50, 178, document.getElementById('enemy-sandwich'), 1, 1, 0.5);
        this.maxFrame = 19;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
        this.y = Math.random() * (game.gameHeight - this.height * this.scale);
        this.y += 10;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

class KarrotEnemy extends Enemy {
    constructor(game) {
        super(game, 100, 150, document.getElementById('enemy-karrot'), 0.5, 1, 0.5);
        this.y = game.gameHeight - this.height * this.scale - 10; // Angepasste Startposition
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}

class BrokkoliEnemy extends Enemy {
    constructor(game) {
        super(game, 105, 250, document.getElementById('enemy-brokkoli'), 0.5, 1, 0.7);
        this.y = game.gameHeight - this.height * this.scale - 10; // Angepasste Startposition
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}




class Coin {
    constructor(game) {
        this.game = game;
        this.width = 50;
        this.height = 30;
        this.x = this.game.gameWidth;
        this.y = Math.random() * (this.game.gameHeight - this.height);
        this.image = document.getElementById('coinImage');
        this.speedX = 2;
        this.markedForDeletion = false;
    }

    update() {
        this.x -= this.speedX + this.game.speed;
        if (this.x + this.width < 0) this.markedForDeletion = true;

        if (this.isCollidingWithPlayer()) {
            this.markedForDeletion = true;
            this.game.playerScore += 1;
            // Münz-Sound abspielen
            document.getElementById('coinSound').play();
        }
    }

    isCollidingWithPlayer() {
        return (
            this.x < this.game.player.x + this.game.player.width * this.game.player.scale &&
            this.x + this.width > this.game.player.x &&
            this.y < this.game.player.y + this.game.player.height * this.game.player.scale &&
            this.y + this.height > this.game.player.y
        );
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.enemies = [];
        this.coins = [];
        this.platforms = [];
        this.enemyTimer = 0;
        this.enemyInterval = 2000;
        this.coinTimer = 0;
        this.coinInterval = 1000;
        this.platformTimer = 0;
        this.platformInterval = 3000;
        this.speed = 0.5;
        this.player = new Player(gameWidth, gameHeight, document.getElementById('player'));
        this.input = new InputHandler(); 
        this.playerScore = 0;
        this.gameOver = false;
        this.gameStarted = false;
        // Hintergrundmusik initialisieren
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.backgroundMusic.loop = true; // Musik in Schleife abspielen
    }

    update(deltaTime) {
        if (!this.gameStarted || this.gameOver) return;

        // Gegner-Logik
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }

        // Münzen-Logik
        if (this.coinTimer > this.coinInterval) {
            this.addCoin();
            this.coinTimer = 0;
        } else {
            this.coinTimer += deltaTime;
        }

        // Plattform-Logik
        if (this.platformTimer > this.platformInterval) {
            this.addPlatform();
            this.platformTimer = 0;
        } else {
            this.platformTimer += deltaTime;
        }

        // Filtern der gelöschten Objekte
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        this.coins = this.coins.filter(coin => !coin.markedForDeletion);
        this.platforms = this.platforms.filter(platform => !platform.markedForDeletion);

        // Update aller Objekte
        [...this.enemies, ...this.coins, ...this.platforms].forEach(object => object.update(deltaTime));

        // Spieler-Update aufrufen
        this.player.update(this.input, deltaTime, this.platforms, this.enemies);

        // Game Over Überprüfung
        if (this.player.lives <= 0) {
            this.gameOver = true;
            this.backgroundMusic.pause();
        }
    }c

    draw(context) {
        if (!this.gameStarted) {
            this.drawStartScreen(context);
        } else if (this.gameOver) {
            this.drawGameOverScreen(context);
        } else {
            // Zeichnen aller Objekte
            [...this.platforms, ...this.enemies, ...this.coins].forEach(object => object.draw(context));
            this.player.draw(context);

            // Anzeigen des Spielerstands
            context.fillStyle = "black";
            context.font = "24px Arial";
            context.fillText(`Score: ${this.playerScore}`, this.gameWidth - 150, 30);
        }
    }

    addCoin() {
        this.coins.push(new Coin(this));
    }

    addPlatform() {
        const platformImages = [
            document.getElementById('plattform-1'),
            document.getElementById('plattform-2'),
        ];
        const randomImage = platformImages[Math.floor(Math.random() * platformImages.length)];
        this.platforms.push(new Platform(this, randomImage));
    }

    addEnemy() {
        const randomValue = Math.random();
        if (randomValue < 0.33) {
            this.enemies.push(new KarrotEnemy(this));
        } else if (randomValue < 0.66) {
            this.enemies.push(new SandwichEnemy(this));
        } else {
            this.enemies.push(new BrokkoliEnemy(this));
        }
    }

    drawStartScreen(context) {
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "white";
        context.font = "40px Arial";
        context.textAlign = "center";
        context.fillText("Willkommen im Gemüse-Jump'n'Run", this.gameWidth / 2, this.gameHeight / 2 - 40);
        context.font = "24px Arial";
        context.fillText("Drücke Leertaste oder Tappe zum Starten", this.gameWidth / 2, this.gameHeight / 2 + 40);
    }

    drawGameOverScreen(context) {
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "white";
        context.font = "40px Arial";
        context.textAlign = "center";
        context.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2 - 40);
        context.font = "24px Arial";
        context.fillText(`Dein Score: ${this.playerScore}`, this.gameWidth / 2, this.gameHeight / 2 + 40);
        context.fillText("Drücke Leertaste oder Tappe zum Neustarten", this.gameWidth / 2, this.gameHeight / 2 + 80);
    }

    startGame() {
        document.getElementById('backgroundMusic').play();
        this.gameStarted = true;
        this.gameOver = false;
        this.player = new Player(this.gameWidth, this.gameHeight, document.getElementById('player'));
        this.enemies = [];
        this.coins = [];
        this.platforms = [];
        this.playerScore = 0;
        // Hintergrundmusik starten
        this.backgroundMusic.currentTime = 0; // Zurück zum Anfang
        this.backgroundMusic.play();
    }

    restartGame() {
        this.startGame();
    }
      }

const game = new Game(canvas.width, canvas.height);



// Event-Listener für Spielstart und Neustart
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (!game.gameStarted) {
            game.startGame();
        } else if (game.gameOver) {
            game.restartGame();
        }
    }
});

let lastTime = 0;

function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Update und Zeichnen der Background-Layer */
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });

    /* Update und Zeichnen des Spiels */
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(animate);
}

animate(0);