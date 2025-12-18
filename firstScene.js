class FirstScene extends Phaser.Scene {
    constructor() {
        super("FirstScene");
    }

    preload() {
        // Make sure file paths are correct relative to your HTML file
        this.load.image("background", "Background.png");
        this.load.image("duck", "assets/duck.png");
        this.load.image("crosshair", "assets/crosshair.png");
        // FIXED: Lowercase 's' for spritesheet
        this.load.spritesheet("animDuck", "assets/animationDuck.png", { frameWidth: 280, frameHeight: 213 });
    }

    create() {
        // 1. Background (First so it is behind everything)
        this.add.image(0, 0, "background").setScale(0.45).setOrigin(0, 0);

        // 2. Animated Duck setup
        this.animDuck = this.add.sprite(50, 250, "animDuck").setScale(1).setOrigin(0, 0);
        this.animDuck.flipX = true; // Flip the animated duck to face right
        
        // Create animation
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("animDuck", { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
        this.animDuck.play("fly", true);
        
        // 4. Physics Duck
        this.duck = this.physics.add.sprite(750, 200, "duck").setOrigin(0.5, 0.5).setScale(0.5);
        this.duck.flipX = true;

        // 5. Crosshair (Only one!)
        this.crosshair = this.physics.add.sprite(400, 300, "crosshair").setScale(0.6).setOrigin(0.5, 0.5);

        // 6. Text
        this.add.text(10, 10, "Click on the duck to shoot it!", { font: "16px Arial", fill: "#000000ff" });

        this.physics.world.setBoundsCollision(true);
        
        // Hide the default mouse cursor so we only see the crosshair
        this.input.setDefaultCursor('none');
    }

    // One function to rule them all!
    moveObject(obj, speed) {
        obj.x += speed;
        
        // OPTIONAL: This makes the duck spin. Remove if you just want it to fly straight.
        // obj.angle += speed; 

        // FIXED: Use this.scale.width instead of config.width
        if (obj.x > this.scale.width) {
            obj.x = -100; // Reset to just off-screen so it flies in smoothly
        }
    }

    update() {
        // Reuse the same function for both ducks
        this.moveObject(this.duck, 2);
        this.moveObject(this.animDuck, 3);

        // Move crosshair with mouse
        this.crosshair.x = this.input.activePointer.worldX;
        this.crosshair.y = this.input.activePointer.worldY;
    }
}
