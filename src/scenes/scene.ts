import randomInteger from "random-int";

export default class Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene' });
    }
    preload() {
    }
    create() {
        const circleGraphics = this.add.graphics();
        const ballRadius = 8;
        const color = 0xffffff;

        circleGraphics.fillStyle(color, 1);
        circleGraphics.lineStyle(1, 0xffffff);

        // Draw the circle with outline
        circleGraphics.strokeCircle(ballRadius, ballRadius, ballRadius);
        circleGraphics.fillCircle(ballRadius, ballRadius, ballRadius);
        circleGraphics.generateTexture("ball", ballRadius * 2, ballRadius * 2);
        circleGraphics.destroy();

        const balls = this.physics.add.group();
        for (let i = 0; i < 2000; i++) {
            const ball = this.physics.add.sprite(512, 700, "ball");
            balls.add(ball);
            ball.setVelocity(Phaser.Math.Between(-1000, 1000), Phaser.Math.Between(-1000, 1000));
            ball.setBounce(1);
            ball.setCollideWorldBounds(true);
        }

        const squareSize = 32;
        const squareColor = 0xff0000;
        const graphics = this.add.graphics();
        graphics.fillStyle(squareColor, 1);
        graphics.fillRect(0, 0, squareSize, squareSize);
        graphics.generateTexture('squareTexture', squareSize, squareSize);
        graphics.destroy(); // Clean up the graphics object

        for (let row = 0; row < 24; row++) {
            for (let column = 0; column < 32; column++) {
                if (randomInteger(1, 2) !== 2) continue;

                // Calculate position for each square
                const x = squareSize * column + squareSize / 2;
                const y = squareSize * row + squareSize / 2;

                // Create the square as a static sprite with the white square texture
                const square = this.physics.add.staticSprite(x, y, 'squareTexture');

                // Add text to the middle of the square
                const text = this.add.text(x, y, randomInteger(1, 5000).toString(), { font: '9px Arial' });
                text.setOrigin(0.5);

                // Make the text a part of the physics body
                square.body.setSize(squareSize, squareSize);
                square.body.setOffset(0, 0); // Adjust offset if needed

                const collide = this.physics.add.staticGroup();
                collide.add(square);

                this.physics.add.collider(balls, collide, () => {
                    const newCount = parseInt(text.text) - 1;
                    if (newCount === 0) {
                        square.destroy();
                        text.destroy();
                    } else {
                        text.setText(newCount.toString());
                    }
                });
            }
        }
    }
}